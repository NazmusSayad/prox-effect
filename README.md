# prox-effect

The `proxEffect` function is used to create a proximity effect by tracking the mouse position relative to an anchor element and invoking a handler function with the calculated degree.

## Syntax

```ts
proxEffect(options: Options): { updatePosition: () => void, abort: () => void }
```

## Parameters

- `options` (required): An object that contains the configuration options for the proximity effect.
  - `anchor` (required): The HTML element that serves as the anchor for the proximity effect.
  - `handler` (required): A function that will be called with the calculated degree as its parameter.
  - `container` (optional): The HTML element that contains the proximity effect. It defaults to `document.documentElement`.

## Return Value

The `proxEffect` function returns an object with two methods:

- `updatePosition`: A method that updates the position of the anchor element.
- `abort`: A method that removes the event listeners and stops the proximity effect.

## Usage

```ts
import proxEffect from 'prox-effect'

// Configuration options
const options = {
  anchor: document.getElementById('myAnchor'),
  handler: (degree) => {
    // Handle the calculated degree
    console.log('Degree:', degree)
  },
  container: document.body,
}

// Create the proximity effect
const effect = proxEffect(options)

// Update the position of the anchor element (if needed)
effect.updatePosition()

// Stop the proximity effect
effect.abort()
```


## Error Handling

The `proxEffect` function performs basic validation of the provided options. It throws errors in the following cases:

- If the `anchor` or `container` options are not instances of `HTMLElement`.
- If the `handler` option is not a function.

Make sure to handle these errors appropriately when using the `proxEffect` function.

<br/><hr/><br/>

# There is something for `react` 

The `useProxEffect` hook is a custom React hook that applies a proximity effect to an element based on its position relative to an anchor element. It returns the degree of proximity as a state value.

### Function Signature

Function:
```ts
useProxEffect(anchorRef: HTMLElementRef, containerRef?: HTMLElementRef): number
```

### Parameters

-   `anchorRef` (required): A reference to the anchor element. It can be a mutable ref object (`MutableRefObject`) or a regular ref object (`RefObject`) that points to an `HTMLElement`.
    
-   `containerRef` (optional): A reference to the container element. It follows the same rules as `anchorRef` and represents the element that contains both the anchor and the element on which the proximity effect is applied. If not provided, the entire document body is used as the container.
    

### Return Value

The `useProxEffect` hook returns a single value, `degree`, which represents the degree of proximity between the anchor and the element on which the effect is applied. The `degree` is a number ranging from 0 to 1, where 0 indicates no proximity and 1 indicates the closest proximity.

### Example Usage

```js
import { useRef } from 'react'
import useProxEffect from 'prox-effect/react'

function MyComponent() {
  const anchorRef = useRef(null)
  const containerRef = useRef(null)
  const degree = useProxEffect(anchorRef, containerRef)

  // Use the degree value to apply the desired effect
  // on the element to create a proximity effect.

  return (
    <div ref={containerRef}>
      <div ref={anchorRef}>Anchor Element</div>
      <div>Element with Proximity Effect</div>
    </div>
  )
}
``` 

In the example above, the `anchorRef` and `containerRef` are created using the `useRef` hook and passed as arguments to the `useProxEffect` hook. The resulting `degree` value can then be used to apply the desired effect on the element that needs to respond to proximity changes.
