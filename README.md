# Verve AI Widget Project

## Widget Screen Router with Jotai

Implemented Jotai-based state management for widget screen routing.

### Implementation

- **Screen Atom**: `screenAtom` manages current widget screen state
- **Screen Types**: 9 different screens (loading, auth, chat, voice, etc.)
- **Dynamic Routing**: Uses `useAtomValue(screenAtom)` to render appropriate screen component

### Files Changed

- `apps/widgets/modules/widget/atoms/widget-atoms.ts` - Screen atom definition
- `apps/widgets/modules/widget/ui/views/widget-view.tsx` - Screen router implementation
- `apps/widgets/components/providers.tsx` - Jotai provider setup

### Usage

```typescript
import { useAtomValue } from "jotai"
import { screenAtom } from "../../atoms/widget-atoms"

const screen = useAtomValue(screenAtom)
// Renders different components based on screen state
```
