import { Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { isPositionInBox } from '@/wysiwyg/helper/dom';
import { findListItem } from '@/wysiwyg/helper/node';

export function taskPlugin() {
  return new Plugin({
    props: {
      handleDOMEvents: {
        mousedown: (view: EditorView, ev: Event) => {
          const { clientX, clientY } = ev as MouseEvent;
          const mousePos = view.posAtCoords({ left: clientX, top: clientY });

          if (mousePos) {
            const { doc, tr } = view.state;
            const currentPos = doc.resolve(mousePos.pos);
            const listItem = findListItem(currentPos);

            const target = ev.target as HTMLElement;
            const style = getComputedStyle(target, ':before');
            const { offsetX, offsetY } = ev as MouseEvent;

            if (!listItem || !isPositionInBox(style, offsetX, offsetY)) {
              return true;
            }

            ev.preventDefault();

            const offset = currentPos.before(listItem.depth);
            const { attrs } = listItem.node;
            const { checked } = attrs;

            tr.setNodeMarkup(offset, null, { ...attrs, ...{ checked: !checked } });
            view.dispatch!(tr);

            return true;
          }

          return false;
        }
      }
    }
  });
}
