import { DOMOutputSpecArray } from 'prosemirror-model';
import { toggleMark } from 'prosemirror-commands';

import { EditorCommand } from '@t/spec';

import Mark from '@/spec/mark';

export class Code extends Mark {
  get name() {
    return 'code';
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'code' }],
      toDOM(): DOMOutputSpecArray {
        return ['code'];
      }
    };
  }

  commands(): EditorCommand {
    return () => (state, dispatch) => toggleMark(state.schema.marks.code)(state, dispatch);
  }

  keymaps() {
    const codeCommand = this.commands()();

    return {
      'Shift-Mod-c': codeCommand,
      'Shift-Mod-C': codeCommand
    };
  }
}
