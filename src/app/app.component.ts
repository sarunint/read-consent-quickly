import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  questions: { prompt: string[][]; defaultResult: boolean }[] = [
    {
      prompt: [
        ['You'],
        ['allow', "don't allow"],
        ['us to'],
        ['publish', 'not publish'],
        ['your personal information.'],
      ],
      defaultResult: false,
    },
    {
      prompt: [
        ['You'],
        ['allow', "don't allow"],
        ['us to store your personal information'],
        ['in a very secure manner.', 'in a not very secure manner.'],
      ],
      defaultResult: true,
    },
    {
      prompt: [
        ['We'],
        ['would like to', 'would not like to'],
        [
          'sell your information to a third-party processor for marketing purposes.',
        ],
      ],
      defaultResult: false,
    },
    {
      prompt: [
        ['You'],
        ['would like to', 'would not like to'],
        ['share', 'not share'],
        ['your real-time location to us.'],
      ],
      defaultResult: false,
    },
    {
      prompt: [
        ['You'],
        ['would like', 'would not like'],
        ['us to'],
        ['publish', 'not to publish'],
        ['your conversation with your ex-partner.'],
      ],
      defaultResult: false,
    },
    {
      prompt: [
        ['You'],
        ['would like to', 'would not like to'],
        ['share', 'not share'],
        ['your secret photos with us.'],
      ],
      defaultResult: false,
    },
  ];
  qIndex = 0;
  currentPromptText = '';
  currentPromptCorrectResponse = true;
  state: 'pregame' | 'started' | 'win' | 'lose' = 'pregame';
  timerId: any = null;

  randomCurrentPrompt() {
    const currentPrompt = this.questions[this.qIndex];
    const prompt: string[] = [];
    let shouldReverse = 0;
    for (const item of currentPrompt.prompt) {
      if (item.length > 1) {
        const rand = Math.floor(Math.random() * 2);
        if (rand === 1) {
          shouldReverse = 1 - shouldReverse;
        }
        prompt.push(item[rand]);
      } else {
        prompt.push(item[0]);
      }
    }
    this.currentPromptText = prompt.join(' ');
    this.currentPromptCorrectResponse = shouldReverse
      ? !currentPrompt.defaultResult
      : currentPrompt.defaultResult;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.timeout();
    }, 3000);
  }

  goToState(state: 'pregame' | 'started' | 'win' | 'lose') {
    this.state = state;
    if (state === 'started') {
      this.randomCurrentPrompt();
    }
  }

  respond(response: boolean) {
    clearTimeout(this.timerId);
    this.timerId = null;
    if (response === this.currentPromptCorrectResponse) {
      if (this.qIndex === this.questions.length - 1) {
        this.goToState('win');
      } else {
        this.qIndex += 1;
        this.randomCurrentPrompt();
      }
    } else {
      this.goToState('lose');
    }
  }

  timeout() {
    this.goToState('lose');
  }

  reset() {
    this.qIndex = 0;
    this.timerId = null;
    this.goToState('pregame');
  }
}
