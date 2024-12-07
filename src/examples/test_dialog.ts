export const testDialog = () => {
  const label = {
    type: CONTROLLER_TYPE.LABEL,
    text: "Would you mind to provide some personal informations?",
  };
  const nameInput = {
    type: CONTROLLER_TYPE.INPUT,
    title: "Name:",
    key: "Name",
    value: "Bob",
  };
  const positionPicker = {
    type: CONTROLLER_TYPE.PICKER,
    title: "Position:",
    key: "Position",
    value: "CEO",
    options: ["CEO", "CTO", "CFO", "CXO"],
  };
  const developerSwitch = {
    type: CONTROLLER_TYPE.SWITCH,
    title: "A Developer:",
    key: "ADeveloper",
    value: 1,
  };

  // It's an option for users to determine weather the inputs should be remembered, if you use this control in the dialog.
  const remember = {
    type: CONTROLLER_TYPE.REMEMBER,
    on: false,
  };

  /*
Define buttons:
type = CONTROLLER_TYPE.BUTTON
title = Button text
color = Button background color, it's optional, the default value is 0x428BCA
width = Button width upon percentage of the dialog width, it's optional, the default value is 0.5, max value is 1.0.
flag = Integer type of button flag for identifying which button is tapped.
collectInputs = Boolean type specifying wheather the dialog should collect the inputs while this button is tapped.
*/
  const btn1 = {
    type: CONTROLLER_TYPE.BUTTON,
    title: "Button 1",
    color: 0x71c69e,
    width: 0.8,
    flag: 1,
    collectInputs: true,
  };
  const btn2 = {
    type: CONTROLLER_TYPE.BUTTON,
    title: "Button 2",
    color: 0xff5733,
    flag: 2,
    collectInputs: true,
  };
  const btn3 = {
    type: CONTROLLER_TYPE.BUTTON,
    title: "Button 3",
    color: 0xffb7d0,
    width: 1.0,
    flag: 3,
    collectInputs: false,
  };
  const btn4 = {
    type: CONTROLLER_TYPE.BUTTON,
    title: "Button 4",
    width: 1.0,
    flag: 4,
    collectInputs: true,
  };

  const controls = [
    label,
    nameInput,
    positionPicker,
    developerSwitch,
    btn1,
    btn2,
    remember,
    btn3,
    btn4,
  ];

  // Pop up the dialog. After popping, the script will suspend waiting for user input until any button is tapped, then returns the flag of tapped button.

  // What orientations the dialog could be, it's optional
  const orientations = [
    INTERFACE_ORIENTATION_TYPE.PORTRAIT,
    INTERFACE_ORIENTATION_TYPE.LANDSCAPE_LEFT,
    INTERFACE_ORIENTATION_TYPE.LANDSCAPE_RIGHT,
  ];

  const result = at.dialog({
    controls,
    orientations,
  });

  if (result == 1) {
    at.alert(
      "name:%s, birthday:%s, gender:%d",
      nameInput.value,
      positionPicker.value,
      developerSwitch.value
    );
  } else {
    at.alert("Dialog returned: %s", result);
  }
};
