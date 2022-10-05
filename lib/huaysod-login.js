'use babel';

import HuaysodLoginView from './huaysod-login-view';
import { CompositeDisposable } from 'atom';

export default {

  huaysodLoginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.huaysodLoginView = new HuaysodLoginView(state.huaysodLoginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.huaysodLoginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'huaysod-login:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.huaysodLoginView.destroy();
  },

  serialize() {
    return {
      huaysodLoginViewState: this.huaysodLoginView.serialize()
    };
  },

  toggle() {
    console.log('HuaysodLogin was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
