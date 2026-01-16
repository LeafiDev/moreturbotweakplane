class TweakpaneExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.panes = {};
    this.tweakpaneReady = false;
    this.eventValues = {}; // Store event values

    this.loadTweakpane();
  }

  loadTweakpane() {
    if (window.Tweakpane) {
      this.tweakpaneReady = true;
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/tweakpane@3.0.7/dist/tweakpane.min.js';
    script.onload = () => {
      console.log('Tweakpane loaded!');
      this.tweakpaneReady = true;
    };
    script.onerror = () => {
      console.error('Failed to load Tweakpane');
    };
    document.head.appendChild(script);
  }

  getInfo() {
    return {
      id: 'tweakpane',
      name: 'Tweakpane UI',
      blocks: [
        {
          opcode: 'createPanel',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Create expandable panel [ID] with title [TITLE] at X: [X] Y: [Y]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'myPanel' },
            TITLE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Settings' },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
          },
        },
        {
          opcode: 'removeAllPanels',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Remove all panels',
        },
        {
          opcode: 'addSlider',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Add slider to [ID] labeled [LABEL] min [MIN] max [MAX]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'myPanel' },
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Speed' },
            MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
          },
        },
        {
          opcode: 'addButton',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Add button to [ID] labeled [LABEL]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'myPanel' },
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Click Me' },
          },
        },
        {
          opcode: 'addDropdown',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Add dropdown to [ID] labeled [LABEL] options [OPTIONS] default [VALUE]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'myPanel' },
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'scene' },
            OPTIONS: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello:foo,world:bar' },
            VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'LDG' },
          },
        },
        {
          opcode: 'addColor',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Add color picker to [ID] labeled [LABEL] default [VALUE]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'myPanel' },
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Tint' },
            VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '#ffffff' },
          },
        },
        {
          opcode: 'whenColorChanged',
          blockType: Scratch.BlockType.HAT,
          text: 'When color [LABEL] is changed',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Tint' },
          },
        },
        {
          opcode: 'getColorValue',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Value of color [LABEL]',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Tint' },
          },
        },
        {
          opcode: 'addPoint',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Add 2D point picker to [ID] labeled [LABEL] default X [X] Y [Y]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'myPanel' },
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Point' },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
          },
        },
        {
          opcode: 'whenPointChanged',
          blockType: Scratch.BlockType.HAT,
          text: 'When point [LABEL] is changed',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Point' },
          },
        },
        {
          opcode: 'getPointValue',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Value of point [LABEL]',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Point' },
          },
        },
        {
          opcode: 'getPointX',
          blockType: Scratch.BlockType.REPORTER,
          text: 'X of point [LABEL]',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Point' },
          },
        },
        {
          opcode: 'getPointY',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Y of point [LABEL]',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Point' },
          },
        },
        {
          opcode: 'whenButtonPressed',
          blockType: Scratch.BlockType.HAT,
          text: 'When button [LABEL] is pressed',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Click Me' },
          },
        },
        {
          opcode: 'whenSliderChanged',
          blockType: Scratch.BlockType.HAT,
          text: 'When slider [LABEL] is changed',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Speed' },
          },
        },
        {
          opcode: 'whenDropdownChanged',
          blockType: Scratch.BlockType.HAT,
          text: 'When dropdown [LABEL] is changed',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'scene' },
          },
        },
        {
          opcode: 'getSliderValue',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Value of slider [LABEL]',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'Speed' },
          },
        },
        {
          opcode: 'getDropdownValue',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Value of dropdown [LABEL]',
          arguments: {
            LABEL: { type: Scratch.ArgumentType.STRING, defaultValue: 'scene' },
          },
        },
      ],
    };
  }

  createPanel(args) {
    if (!this.tweakpaneReady || !window.Tweakpane) {
      console.warn('Tweakpane is not ready yet!');
      return;
    }

    const { ID, TITLE, X, Y } = args;
    if (this.panes[ID]) return; // Prevent duplicate panels

    const pane = new window.Tweakpane.Pane();
    pane.element.style.position = 'absolute';
    pane.element.style.left = `${X}px`;
    pane.element.style.top = `${Y}px`;

    const stage = document.querySelector('.stage_stage_1fD7k');
    if (stage) {
      stage.appendChild(pane.element);
    } else {
      document.body.appendChild(pane.element);
    }

    const folder = pane.addFolder({
      title: TITLE,
    });

    this.panes[ID] = { pane, folder };
  }

  addSlider(args) {
    const { ID, LABEL, MIN, MAX } = args;
    const panel = this.panes[ID];
    if (!panel) return;

    const slider = panel.folder.addBlade({
      view: 'slider',
      label: LABEL,
      min: MIN,
      max: MAX,
      value: (MIN + MAX) / 2,
    });

    this.eventValues[LABEL] = (MIN + MAX) / 2;

    slider.on('change', (event) => {
      this.eventValues[LABEL] = event.value;
      setTimeout(() => {
        Scratch.vm.runtime.startHats('tweakpane_whenSliderChanged', {
          LABEL,
        });
      }, 0);
    });
  }

  addDropdown(args) {
    const { ID, LABEL, OPTIONS, VALUE } = args;
    const panel = this.panes[ID];
    if (!panel) return;

    const optionsArr = [];
    if (typeof OPTIONS === 'string') {
      const parts = OPTIONS.split(',').map((s) => s.trim()).filter(Boolean);
      parts.forEach((p) => {
        const [textPart, valuePart] = p.split(':').map((s) => s.trim());
        if (valuePart === undefined) {
          optionsArr.push({ text: textPart, value: textPart });
        } else {
          optionsArr.push({ text: textPart, value: valuePart });
        }
      });
    }

    const initialValue = VALUE || (optionsArr[0] && optionsArr[0].value) || '';
    this.eventValues[LABEL] = initialValue;

    const dropdown = panel.folder.addBlade({
      view: 'list',
      label: LABEL,
      options: optionsArr,
      value: initialValue,
    });

    dropdown.on('change', (event) => {
      this.eventValues[LABEL] = event.value;
      setTimeout(() => {
        Scratch.vm.runtime.startHats('tweakpane_whenDropdownChanged', {
          LABEL,
        });
      }, 0);
    });
  }

  addColor(args) {
    const { ID, LABEL, VALUE } = args;
    const panel = this.panes[ID];
    if (!panel) return;

    const initialValue = VALUE || '#ffffff';
    this.eventValues[LABEL] = initialValue;

    // Use an unbound temporary object and add an input for its `value` property.
    // This uses Tweakpane's color input plugins (string/object/number) instead
    // of relying on a `color` blade view which may not be registered.
    const tmp = { value: initialValue };
    const input = panel.folder.addInput(tmp, 'value', { label: LABEL });

    input.on('change', (event) => {
      // Normalize stored value to a hex string when possible.
      let v = tmp.value;
      if (v && typeof v === 'object' && 'r' in v && 'g' in v && 'b' in v) {
        const r = Math.max(0, Math.min(255, Math.round(v.r)));
        const g = Math.max(0, Math.min(255, Math.round(v.g)));
        const b = Math.max(0, Math.min(255, Math.round(v.b)));
        v = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      }
      this.eventValues[LABEL] = v;
      setTimeout(() => {
        Scratch.vm.runtime.startHats('tweakpane_whenColorChanged', {
          LABEL,
        });
      }, 0);
    });
  }

  addPoint(args) {
    const { ID, LABEL, X, Y } = args;
    const panel = this.panes[ID];
    if (!panel) return;

    const initial = { x: typeof X === 'number' ? X : 0, y: typeof Y === 'number' ? Y : 0 };
    this.eventValues[LABEL] = { x: initial.x, y: initial.y };

    const tmp = { value: { x: initial.x, y: initial.y } };
    const input = panel.folder.addInput(tmp, 'value', { label: LABEL });

    input.on('change', () => {
      const v = tmp.value || { x: 0, y: 0 };
      this.eventValues[LABEL] = { x: Number(v.x) || 0, y: Number(v.y) || 0 };
      setTimeout(() => {
        Scratch.vm.runtime.startHats('tweakpane_whenPointChanged', {
          LABEL,
        });
      }, 0);
    });
  }

  addButton(args) {
    const { ID, LABEL } = args;
    const panel = this.panes[ID];
    if (!panel) return;

    const button = panel.folder.addButton({
      title: LABEL,
    });

    button.on('click', () => {
      setTimeout(() => {
        Scratch.vm.runtime.startHats('tweakpane_whenButtonPressed', {
          LABEL,
        });
      }, 0);
    });
  }

  whenColorChanged() {
    // Event fires automatically when the color value changes
  }

  whenPointChanged() {
    // Event fires automatically when the point value changes
  }

  removeAllPanels() {
    Object.keys(this.panes).forEach((panelID) => {
      const { pane } = this.panes[panelID];
      if (pane) {
        pane.element.remove();
      }
    });
    this.panes = {};
    console.log('All panels removed!');
  }

  whenButtonPressed() {
    // Event fires automatically when the button is pressed
  }

  whenSliderChanged() {
    // Event fires automatically when the slider value changes
  }

  getSliderValue(args) {
    return this.eventValues[args.LABEL] || 0;
  }

  getDropdownValue(args) {
    return this.eventValues[args.LABEL] || '';
  }

  getColorValue(args) {
    return this.eventValues[args.LABEL] || '#ffffff';
  }

  getPointValue(args) {
    const v = this.eventValues[args.LABEL] || { x: 0, y: 0 };
    return `${v.x},${v.y}`;
  }

  getPointX(args) {
    const v = this.eventValues[args.LABEL];
    return v && typeof v.x === 'number' ? v.x : 0;
  }

  getPointY(args) {
    const v = this.eventValues[args.LABEL];
    return v && typeof v.y === 'number' ? v.y : 0;
  }
}
  


Scratch.extensions.register(new TweakpaneExtension());
