# React Cat(egory) tree


>This is merely an actively maintained forked version of this package [here](https://github.com/lifejuggler/react-cat-tree) - Managed by the lifejuggler

>A React component for Drag-and-drop sortable representation of hierarchical data. Checkout the [demo](https://lifejuggler.github.io/react-cat-tree/) for a demonstration of some basic features. Checkout the [storybook](https://lifejuggler.github.io/react-cat-tree/storybook) for advanced usage.

<div align="center">
  <img src="https://cloud.githubusercontent.com/assets/4413963/19334888/2be8261c-913a-11e6-9508-4b347ae114b4.gif"/>
</div>

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Props](#props)
- [Data Helpers](#data-helper-functions)
- [Themes](#themes)
- [Browser Compatibility](#browser-compatibility)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Getting started

Install `react-cat-tree` using npm.

```sh
# NPM
npm install react-cat-tree --save

# YARN
yarn add react-cat-tree
```

ES6 and CommonJS builds are available with each distribution.
For example:

```js
// This only needs to be done once; probably during your application's bootstrapping process.
import 'react-cat-tree/style.css';

// You can import the default tree with dnd context
import SortableTree from 'react-cat-tree';

// Or you can import the tree without the dnd context as a named export. eg
import { SortableTreeWithoutDndContext as SortableTree } from 'react-cat-tree';

// Importing from cjs (default)
import SortableTree from 'react-cat-tree/dist/index.cjs.js';
import SortableTree from 'react-cat-tree';

// Importing from esm
import SortableTree from 'react-cat-tree/dist/index.esm.js';
```

## Usage

```jsx
import React, { Component } from 'react';
import SortableTree from 'react-cat-tree';
import 'react-cat-tree/style.css'; // This only needs to be imported once in your app

export default class Tree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline'}] }
      ],
    };
  }

  render() {
    return (
      <div style={{ height: 400 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}
```

## Props

| Prop                           |      Type      | <div style="width: 400px;">Description</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :----------------------------- | :------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| treeData<br/>_(required)_      |    object[]    | Tree data with the following keys: <div>`title` is the primary label for the node.</div><div>`subtitle` is a secondary label for the node.</div><div>`expanded` shows children of the node if true, or hides them if false. Defaults to false.</div><div>`children` is an array of child nodes belonging to the node.</div><div>**Example**: `[{title: 'main', subtitle: 'sub'}, { title: 'value2', expanded: true, children: [{ title: 'value3') }] }]`                                                                                                                                                                                           |
| onChange<br/>_(required)_      |      func      | Called whenever tree data changed. Just like with React input elements, you have to update your own component's data to see the changes reflected.<div>`( treeData: object[] ): void`</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| getNodeKey<br/>_(recommended)_ |      func      | Specify the unique key used to identify each node and generate the `path` array passed in callbacks. With a setting of `getNodeKey={({ node }) => node.id}`, for example, in callbacks this will let you easily determine that the node with an `id` of `35` is (or has just become) a child of the node with an `id` of `12`, which is a child of ... and so on. It uses [`defaultGetNodeKey`](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/default-handlers.js) by default, which returns the index in the tree (omitting hidden nodes).<div>`({ node: object, treeIndex: number }): string or number`</div> |
| generateNodeProps              |      func      | Generate an object with additional props to be passed to the node renderer. Use this for adding buttons via the `buttons` key, or additional `style` / `className` settings.<div>`({ node: object, path: number[] or string[], treeIndex: number, lowerSiblingCounts: number[], isSearchMatch: bool, isSearchFocus: bool }): object`</div>                                                                                                                                                                                                                                                                                                         |
| onMoveNode                     |      func      | Called after node move operation. <div>`({ treeData: object[], node: object, nextParentNode: object, prevPath: number[] or string[], prevTreeIndex: number, nextPath: number[] or string[], nextTreeIndex: number }): void`</div>                                                                                                                                                                                                                                                                                                                                                                                                                  |
| onVisibilityToggle             |      func      | Called after children nodes collapsed or expanded. <div>`({ treeData: object[], node: object, expanded: bool, path: number[] or string[] }): void`</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| onDragStateChanged             |      func      | Called when a drag is initiated or ended. <div>`({ isDragging: bool, draggedNode: object }): void`</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| maxDepth                       |     number     | Maximum depth nodes can be inserted at. Defaults to infinite.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| rowDirection                   |     string     | Adds row direction support if set to `'rtl'` Defaults to `'ltr'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| canDrag                        |  func or bool  | Return false from callback to prevent node from dragging, by hiding the drag handle. Set prop to `false` to disable dragging on all nodes. Defaults to `true`. <div>`({ node: object, path: number[] or string[], treeIndex: number, lowerSiblingCounts: number[], isSearchMatch: bool, isSearchFocus: bool }): bool`</div>                                                                                                                                                                                                                                                                                                                        |
| canDrop                        |      func      | Return false to prevent node from dropping in the given location. <div>`({ node: object, prevPath: number[] or string[], prevParent: object, prevTreeIndex: number, nextPath: number[] or string[], nextParent: object, nextTreeIndex: number }): bool`</div>                                                                                                                                                                                                                                                                                                                                                                                      |
| canNodeHaveChildren            |      func      | Function to determine whether a node can have children, useful for preventing hover preview when you have a `canDrop` condition. Default is set to a function that returns `true`. Functions should be of type `(node): bool`.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| theme                          |     object     | Set an all-in-one packaged appearance for the tree. See the [Themes](#themes) section for more information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| searchMethod                   |      func      | The method used to search nodes. Defaults to [`defaultSearchMethod`](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/default-handlers.js), which uses the `searchQuery` string to search for nodes with matching `title` or `subtitle` values. NOTE: Changing `searchMethod` will not update the search, but changing the `searchQuery` will.<div>`({ node: object, path: number[] or string[], treeIndex: number, searchQuery: any }): bool`</div>                                                                                                                                                               |
| searchQuery                    | string or any  | Used by the `searchMethod` to highlight and scroll to matched nodes. Should be a string for the default `searchMethod`, but can be anything when using a custom search. Defaults to `null`.                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| searchFocusOffset              |     number     | Outline the <`searchFocusOffset`>th node and scroll to it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| onlyExpandSearchedNodes        |    boolean     | Only expand the nodes that match searches. Collapses all other nodes. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| searchFinishCallback           |      func      | Get the nodes that match the search criteria. Used for counting total matches, etc.<div>`(matches: { node: object, path: number[] or string[], treeIndex: number }[]): void`</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| dndType                        |     string     | String value used by [react-dnd](http://react-dnd.github.io/react-dnd/docs-overview.html) (see overview at the link) for dropTargets and dragSources types. If not set explicitly, a default value is applied by react-cat-tree for you for its internal use. **NOTE:** Must be explicitly set and the same value used in order for correct functioning of external nodes                                                                                                                                                                                                                                                                     |
| shouldCopyOnOutsideDrop        |  func or bool  | Return true, or a callback returning true, and dropping nodes to react-dnd drop targets outside of the tree will not remove them from the tree. Defaults to `false`. <div>`({ node: object, prevPath: number[] or string[], prevTreeIndex: number, }): bool`</div>                                                                                                                                                                                                                                                                                                                                                                                 |
| reactVirtualizedListProps      |     object     | Custom properties to hand to the internal [react-virtualized List](https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md#prop-types)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| style                          |     object     | Style applied to the container wrapping the tree (style defaults to `{height: '100%'}`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| innerStyle                     |     object     | Style applied to the inner, scrollable container (for padding, etc.)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| className                      |     string     | Class name for the container wrapping the tree                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| rowHeight                      | number or func | Used by react-cat-tree. Defaults to `62`. Either a fixed row height (number) or a function that returns the height of a row given its index: `({ treeIndex: number, node: object, path: number[] or string[] }): number`                                                                                                                                                                                                                                                                                                                                                                                                                      |
| slideRegionSize                |     number     | Size in px of the region near the edges that initiates scrolling on dragover. Defaults to `100`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| scaffoldBlockPxWidth           |     number     | The width of the blocks containing the lines representing the structure of the tree. Defaults to `44`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| isVirtualized                  |      bool      | Set to false to disable virtualization. Defaults to `true`. **NOTE**: Auto-scrolling while dragging, and scrolling to the `searchFocusOffset` will be disabled.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| nodeContentRenderer            |      any       | Override the default component ([`NodeRendererDefault`](https://github.com/lifejuggler/react-cat-tree/blob/master/src/node-renderer-default.js)) for rendering nodes (but keep the scaffolding generator). This is a last resort for customization - most custom styling should be able to be solved with `generateNodeProps`, a `theme` or CSS rules. If you must use it, is best to copy the component in `node-renderer-default.js` to use as a base, and customize as needed.                                                                                                                                                     |
| placeholderRenderer            |      any       | Override the default placeholder component ([`PlaceholderRendererDefault`](https://github.com/lifejuggler/react-cat-tree/blob/master/src/placeholder-renderer-default.js)) which is displayed when the tree is empty. This is an advanced option, and in most cases should probably be solved with a `theme` or custom CSS instead.                                                                                                                                                                                                                                                                                                   |

## Data Helper Functions

Need a hand turning your flat data into nested tree data?
Want to perform add/remove operations on the tree data without creating your own recursive function?
Check out the helper functions exported from [`tree-data-utils.js`](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js).

- [**`getTreeFromFlatData`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L979): Convert flat data (like that from a database) into nested tree data.
- [**`getFlatDataFromTree`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L946): Convert tree data back to flat data.
- [**`addNodeUnderParent`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L614): Add a node under the parent node at the given path.
- [**`removeNode`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L534): For a given path, get the node at that path, treeIndex, and the treeData with that node removed.
- [**`removeNodeAtPath`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L506): For a given path, remove the node and return the treeData.
- [**`changeNodeAtPath`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L409): Modify the node object at the given path.
- [**`map`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L359): Perform a change on every node in the tree.
- [**`walk`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L326): Visit every node in the tree in order.
- [**`getDescendantCount`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L60): Count how many descendants this node has.
- [**`getVisibleNodeCount`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L248): Count how many visible descendants this node has.
- [**`getVisibleNodeInfoAtIndex`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L286): Get the <targetIndex>th visible node in the tree data.
- [**`toggleExpandedForAll`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L389): Expand or close every node in the tree.
- [**`getNodeAtPath`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L573): Get the node at the input path.
- [**`insertNode`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L885): Insert the input node at the specified depth and minimumTreeIndex.
- [**`find`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L1077): Find nodes matching a search query in the tree.
- [**`isDescendant`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L1027): Check if a node is a descendant of another node.
- [**`getDepth`**](https://github.com/lifejuggler/react-cat-tree/blob/master/src/utils/tree-data-utils.js#L1045): Get the longest path in the tree.

## Themes

TBA

## Browser Compatibility

| Browser | Works? |
| :------ | :----- |
| Chrome  | Yes    |
| Firefox | Yes    |
| Safari  | Yes    |
| IE 11   | Yes    |

## Troubleshooting

### If it throws "TypeError: fn is not a function" errors in production

This issue may be related to an ongoing incompatibility between UglifyJS and Webpack's behavior. See an explanation at [create-react-app#2376](https://github.com/facebookincubator/create-react-app/issues/2376).

The simplest way to mitigate this issue is by adding `comparisons: false` to your Uglify config as seen here: https://github.com/facebookincubator/create-react-app/pull/2379/files

### If it doesn't work with other components that use react-dnd

react-dnd only allows for one DragDropContext at a time (see: https://github.com/gaearon/react-dnd/issues/186). To get around this, you can import the context-less tree component via `SortableTreeWithoutDndContext`.

```js
// before
import SortableTree from 'react-cat-tree';

// after
import { SortableTreeWithoutDndContext as SortableTree } from 'react-cat-tree';
```

## Contributing

Please read the [Code of Conduct](CODE_OF_CONDUCT.md). I actively welcome pull requests :)

After cloning the repository and running `yarn install` inside, you can use the following commands to develop and build the project.

```sh
# Starts a webpack dev server that hosts a demo page with the component.
# It uses react-hot-loader so changes are reflected on save.
yarn start

# Start the storybook, which has several different examples to play with.
# Also hot-reloaded.
yarn run storybook

# Runs the library tests
yarn test

# Lints the code with eslint
yarn run lint

# Lints and builds the code, placing the result in the dist directory.
# This build is necessary to reflect changes if you're
#  `npm link`-ed to this repository from another local project.
yarn run build
```

Pull requests are welcome!

## License

MIT
