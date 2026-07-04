# Drone Motor English Routine App Design

## Purpose

Build a personal mobile-first web app for daily English speaking practice. The user wants to study for about 30 minutes each morning, focused on English used when selling drone motors, explaining motor strengths, and meeting with drone manufacturers.

The first version should be simple enough to use every day: open the app, review important expressions, practice speaking them aloud, and mark what needs more review.

## Target User

- A single user who works on drone motors.
- Current English level: can say short sentences, but wants to connect them more naturally in meetings.
- Main use cases:
  - Explain motor strengths in English.
  - Speak during sales or technical meetings with drone manufacturers.
  - Memorize useful expressions for motor performance, reliability, heat, efficiency, flight time, and integration.

## Product Direction

The selected approach is a 30-minute routine app, not a generic flashcard tool.

The app guides the user through a daily practice session:

1. Review expressions previously marked as needing attention.
2. Learn new expressions from the built-in drone motor card pack.
3. Practice each card in two modes:
   - Read the English sentence and speak it aloud.
   - View the Korean meaning or situation, speak the English answer, then reveal the answer.
4. Mark each card as memorized, uncertain, or review again.
5. Finish with a short daily summary.

Fill-in-the-blank exercises are explicitly out of scope for the first version.

## First Version Scope

### Included

- Mobile-first web app.
- Personal use only.
- No login.
- Browser-local storage for cards, card status, settings, and study history.
- Built-in starter card pack for drone motor sales and meetings.
- Card management:
  - View cards.
  - Add cards.
  - Edit cards.
  - Delete cards stored in the user's browser.
- Daily practice flow:
  - Review cards marked `review_again` first.
  - Then show new or less-practiced cards.
  - Track session progress.
- Self-check states:
  - `memorized`
  - `uncertain`
  - `review_again`
- Basic study records:
  - Date.
  - Number of practiced cards.
  - Number of cards marked for review.
  - Whether the daily session was completed.

### Excluded From First Version

- Microphone recording.
- Automatic pronunciation feedback.
- AI-generated expressions from product specifications.
- Cloud sync.
- Login or team features.
- Complex analytics.
- Fill-in-the-blank quizzes.

These features should remain possible later through clean data and module boundaries.

## Screens

### Today

The first screen after opening the app. It shows:

- A start button for today's study.
- Count of review cards waiting.
- Count of available new cards.
- Simple progress for today's session.

The screen should feel like a focused morning routine, not a dashboard full of statistics.

### Practice

The main card training screen.

Each card has two practice stages:

1. English-first stage:
   - Show the English sentence.
   - Show the Korean meaning or situation.
   - Encourage the user to read the sentence aloud two or three times.
2. Korean-first stage:
   - Hide the English sentence.
   - Show the Korean meaning or situation.
   - Let the user say the English answer.
   - Reveal the English sentence.

After revealing the answer, the user marks the card:

- Memorized.
- Uncertain.
- Review again.

The next card appears after the user chooses a self-check state.

### Cards

Card management screen.

Each card contains:

- English sentence.
- Korean meaning or situation.
- Category.

Starter categories should cover practical drone motor meeting situations, such as:

- Performance and efficiency.
- Flight time.
- Heat and reliability.
- Integration and compatibility.
- Sales pitch.
- Customer questions.

The user can add, edit, and delete cards. Built-in cards are copied into local storage on first run and then treated like normal editable local cards.

### Delivery

The app should be deployable as a mobile web app that the user can open from an internet address. The first version stores data only in the browser used to access the app, so records do not automatically follow the user to another phone or PC.

### Records

Simple history screen.

Show:

- Today's practiced card count.
- Current review-again count.
- Recent study days.
- Completed sessions.

This screen should stay lightweight in the first version.

## Data Model

### Card

```ts
type Card = {
  id: string;
  english: string;
  korean: string;
  category: string;
  source: "starter" | "user";
  createdAt: string;
  updatedAt: string;
};
```

### Card Progress

```ts
type CardProgress = {
  cardId: string;
  status: "new" | "memorized" | "uncertain" | "review_again";
  practiceCount: number;
  lastPracticedAt?: string;
};
```

### Study Record

```ts
type StudyRecord = {
  date: string;
  practicedCardIds: string[];
  reviewAgainCount: number;
  completed: boolean;
};
```

### Settings

```ts
type Settings = {
  dailyTargetCards: number;
};
```

The default daily target should be around 10 cards. The routine is intended to fit about 30 minutes, but the first version does not force a strict timer.

## Study Selection Logic

When a daily session starts:

1. Load all cards and progress records from browser storage.
2. Select cards marked `review_again` first.
3. If the daily target is not reached, add cards with `new` status.
4. If more cards are needed, add cards marked `uncertain`.
5. Avoid repeating cards already completed in today's session unless the user starts again manually.

This keeps the app useful even when the user mostly wants to focus on difficult expressions.

## Storage

Use browser-local storage for the first version.

Storage should keep separate keys for:

- Cards.
- Card progress.
- Study records.
- Settings.
- Starter card pack version.

On first run:

1. Load the built-in starter card pack.
2. Save it into local storage.
3. Create default progress records.
4. Create default settings.

If saved data is missing or invalid, the app should recover gracefully by restoring defaults where possible. The app should avoid saving empty English or Korean card text.

## Architecture

The implementation should use clear boundaries:

- UI components:
  - Today screen.
  - Practice screen.
  - Cards screen.
  - Records screen.
  - Bottom navigation.
- Data module:
  - Starter cards.
  - Storage read/write helpers.
  - Data validation and default recovery.
- Study module:
  - Daily session card selection.
  - Card status updates.
  - Study record updates.

This separation keeps later features easier to add:

- Microphone recording can attach to the Practice screen.
- AI card generation can add cards through the same card creation path.
- Cloud sync can replace or wrap the storage module.

## UX Principles

- Mobile-first.
- Fast to start.
- Few decisions in the morning.
- Large readable card text.
- Clear speaking stages.
- No heavy statistics or distracting settings in the first version.
- Korean labels may be used for navigation and instructions, while English expressions remain prominent.

## Error Handling

- Do not save cards with empty English or Korean text.
- If local storage contains invalid data, fall back to default starter data where possible.
- If no cards are available, guide the user to add cards from the Cards screen.
- If today's session has already been completed, allow reviewing the summary and optionally starting another session.

## Testing And Verification

First-version verification should cover:

- First launch seeds the starter card pack.
- Today screen shows review and new card counts.
- Cards marked `review_again` appear before new cards in the next session.
- Card add, edit, and delete changes persist after reload.
- Practice flow moves through English-first, Korean-first, reveal, and self-check stages.
- Study record is saved when the session is completed.
- Layout works on mobile viewport sizes.

## Future Extensions

Possible later features:

- Microphone recording and playback.
- Pronunciation or fluency feedback.
- AI-generated card suggestions from real motor specifications.
- Product-specific card packs.
- Cloud sync across phone and PC.
- Team sharing for company colleagues.
- Meeting simulation with customer questions.

These are not required for the first implementation.
