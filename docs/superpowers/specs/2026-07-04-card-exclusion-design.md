# Card Exclusion Feature Design

## Purpose

Add a fast way to remove irrelevant practice sentences from the daily routine without permanently deleting them.

The user may see a sentence during practice that does not match their product, sales style, or real meeting needs. In that moment, the app should let the user skip it from future study while keeping the morning routine moving.

## User Decision

Use the label `내 표현과 안 맞음` in the practice flow.

When selected:

1. The current card is excluded immediately.
2. The app moves to the next card without a confirmation dialog.
3. The excluded card no longer appears in daily sessions.
4. The excluded card can still be managed later from the Cards screen.

## Included Scope

- Add an excluded state to card progress.
- Add a `내 표현과 안 맞음` action to the Practice screen.
- Exclude cards from:
  - Today's preview cards.
  - New daily sessions.
  - Restarted daily sessions.
- Do not count an excluded card as practiced for today's completion total.
- In the Cards screen, add a study-state filter:
  - All.
  - Active.
  - Excluded.
- Show excluded cards in the Cards screen with a visible excluded indicator.
- Add a Restore action for excluded cards.
- Keep existing edit and delete actions available for excluded cards.

## Excluded From Scope

- AI replacement sentence generation.
- A confirmation dialog before exclusion.
- Automatic replacement with another sentence from the same category.
- Cloud sync or account-level exclusion.
- Bulk exclusion.

## Data Model Change

Extend `CardProgress.status`:

```ts
type CardProgressStatus =
  | "new"
  | "memorized"
  | "uncertain"
  | "review_again"
  | "excluded";
```

The app should treat older stored data as valid. Cards without progress still receive the default `new` status.

## Practice Flow

The Practice screen should continue to have two learning stages and one reveal stage:

1. English-first speaking.
2. Korean-first recall.
3. Answer reveal and self-check.

The `내 표현과 안 맞음` action should be available during practice. The best first-version placement is in the reveal/self-check area because that is where the user has enough context to decide whether the sentence fits.

When the user taps it:

1. Set the current card progress status to `excluded`.
2. Do not add the card to today's practiced card IDs.
3. Move to the next card.
4. If no cards remain, finish the session.

## Card Selection Logic

Daily session selection must ignore cards with status `excluded`.

Selection priority stays:

1. `review_again`
2. `new`
3. `uncertain`
4. `memorized`

Excluded cards should not be used to fill the daily target.

## Cards Screen

Add a simple study-state filter alongside search and category filter:

- All: show every card.
- Active: show cards whose progress status is not `excluded`.
- Excluded: show only excluded cards.

For each excluded card:

- Show an `Excluded` or `제외됨` indicator.
- Show `복원`, `수정`, and `삭제` actions.

When restored:

1. Change status from `excluded` to `new`.
2. Keep the existing practice count and timestamps.
3. The card becomes eligible for future sessions.

## Error Handling

- If a card is excluded while it is the last card in a session, complete the session gracefully.
- If every card is excluded, Today should tell the user there are no active cards and guide them to restore or add cards.
- If old browser storage contains an unknown status, normalize it to `new`.

## Testing And Verification

Verify:

- `내 표현과 안 맞음` marks the current card as excluded and advances the session.
- Excluded cards do not appear in the next daily session.
- Excluded cards do not appear in Today's preview.
- Excluded cards do not increase today's practiced count.
- Cards screen can filter to excluded cards.
- Restore changes the card back to active study.
- Edit and delete still work for excluded cards.
- Old stored progress records without `excluded` continue to work.

## Future Extension

Later, the app may add a separate AI-assisted replacement flow:

1. User marks a card as not fitting.
2. App asks for the user's intended meaning or product detail.
3. AI suggests a replacement sentence.
4. User accepts it as a new card or updates the existing card.

This is intentionally not part of the first implementation.
