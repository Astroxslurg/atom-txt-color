'use babel';

import AstroxslurgTxtColorView from './astroxslurg-txt-color-view';
import { CompositeDisposable } from 'atom';

export default {

  astroxslurgTxtColorView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.astroxslurgTxtColorView = new AstroxslurgTxtColorView(state.astroxslurgTxtColorViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.astroxslurgTxtColorView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'astroxslurg-txt-color:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.astroxslurgTxtColorView.destroy();
  },

  serialize() {
    return {
      astroxslurgTxtColorViewState: this.astroxslurgTxtColorView.serialize()
    };
  },

  toggle() {
    console.log('AstroxslurgTxtColor was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
