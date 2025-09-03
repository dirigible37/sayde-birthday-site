# YellowBrickRoad Component Rewrite Plan

## Q&A Session

**Q: Fixed Height - The road can be pre-drawn and have a fixed height of however tall our site is?**
A: The road can be pre-drawn and have a fixed height of however tall our site is. This site is a scrolling page with elements along it, so we can hardcode the height of everything.

**Q: Winding Pattern - Should it be a sine wave pattern like current implementation?**
A: Sine is good

**Q: Road Visual Style - Keep current brick texture?**
A: Just a yellow brick road pattern, doesn't have to be the current implementation. **CORRECTION: The brick pattern is NOT optional - this is a yellow BRICK road.**

**Q: Dorothy's Movement - Should she move smoothly along curves, stay centered vertically?**
A: Move smoothly along the curves as the user scrolls, always centered on the screen vertically, and no animation, just move her

**Q: Scroll Behavior - Should road be visible for entire journey, how does progress prop work?**
A: Yes, the road should be visible for the entire journey, starting at 50vh on the opening page. I don't understand the progress question

**Q: Performance - Should we keep current complex implementation?**
A: Don't worry about the current implementation at all. Come up with a new one from scratch. Keep it simple but looking good.

## Implementation Plan

### 1. Simplified Component Structure
- Remove all complex height calculations and document measurements
- Create a fixed-height SVG that spans the full page height
- Use a simple sine wave path for the road

### 2. Road Implementation
- **Fixed SVG viewBox**: Use consistent dimensions (e.g., 800x5000)
- **Sine wave path**: Create smooth winding road using Math.sin()
- **Yellow brick styling**: Proper yellow brick pattern - must look like actual bricks
- **Road positioning**: Start at 50vh (middle of screen) and wind down

### 3. Dorothy Character Positioning
- **Fixed vertical position**: Always at 50vh (screen center)
- **Horizontal tracking**: Calculate X position based on sine wave at current scroll progress
- **Smooth movement**: Use CSS transforms for positioning
- **No animations**: Just position updates, no rotation or bounce effects

### 4. Scroll Progress Integration
- **Progress calculation**: Map scroll position (0-100%) to position along sine wave
- **Direct coordinate mapping**: Calculate Dorothy's X position using same sine function as road
- **Responsive**: Ensure positioning works on all screen sizes

### 5. Visual Design
- **Road appearance**: Yellow brick pattern - proper brick texture is required
- **Road width**: Consistent stroke width throughout
- **Dorothy styling**: Keep existing drop-shadow and sizing
- **Clean code**: Remove unnecessary complexity, keep it readable

### 6. Key Simplifications from Current Implementation
- Remove document height calculations and resize listeners
- Remove complex responsive scaling logic
- Remove viewBox manipulation and preserve aspect ratio complications
- Use straightforward sine wave math for both road and Dorothy positioning
- Hardcode reasonable dimensions instead of dynamic calculations

### 7. Technical Approach
```typescript
// Pseudo-code structure:
interface YellowBrickRoadProps {
  progress: number; // 0 to 100
}

// Simple sine wave calculation:
const roadX = centerX + Math.sin(progress * waveFrequency) * amplitude;

// Dorothy position:
const dorothyX = roadX; // Same as road
const dorothyY = '50vh'; // Always centered vertically
```

This approach will be much simpler, more maintainable, and should work reliably across different screen sizes while maintaining the visual appeal of a winding yellow brick road.