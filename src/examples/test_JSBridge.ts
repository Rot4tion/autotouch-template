export const testJSBridge = () => {
  /**
   * With JSBridge you can call any class/methods/variables of iOS
   */

  // Import extension functions of AutoTouch
  const {
    getScreenInfo,
    frontMostAppOrientation,
    toast,
  } = at;

  // Import required classes of iOS/Objective-C
  const UIWindow = use_jsbridge("UIWindow");
  const UIView = use_jsbridge("UIView");
  const UILabel = use_jsbridge("UILabel");
  const UIImageView = use_jsbridge("UIImageView");
  const UIImage = use_jsbridge("UIImage");
  const UIColor = use_jsbridge("UIColor");

  // Construct an UIAlertView
  function showAlertView() {
    // // Show an alert view of iOS
    var alertView = use_jsbridge("UIAlertView")
      .alloc()
      .init();

    alertView.setTitle("What is this?");
    alertView.setMessage(
      "This is UIAlertView of iOS which is called through JSBridge, you can use JSBridge to call any class/methods/variables of iOS, it makes anything possible!"
    );
    alertView.addButtonWithTitle("OK");

    alertView.show();
  }

  //-------------------------------------------------------------------------------
  // !!!!!!!!ANYTHING relative to UI should be in dispatch_async_main block!!!!!!!!
  //-------------------------------------------------------------------------------
  dispatch_async_main(function () {
    // original implementation of openning another app in iOS with Objective-C
    //[[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];

    // // open another app with our js
    // var url = use('NSURL').URLWithString('maps://');
    // use('UIApplication').sharedApplication().openURL(url);

    //-------------------------------------------------------- Construct an UIWindow

    // implement it with js
    var frame = {
      x: 0,
      y: 0,
      width: 300,
      height: 300,
    };
    var window =
      UIWindow.alloc().initWithFrame(frame);
    var color = UIColor.redColor();
    window.setBackgroundColor(color);
    window.setWindowLevel(1000);
    window.makeKeyAndVisible();

    //-------------------------------------------------------- Construct an UILabel
    // original implementation of constructing an UILable in iOS with Objective-C
    // CGRect frame = CGRectMake(10, 10, 200, 21);
    // UILabel *label = [[UILabel alloc] initWithFrame:frame];
    // label.text = @"xxxxxxx";
    // [view addSubview:label];

    var labelFrame = {
      x: 10,
      y: 10,
      width: 300,
      height: 30,
    };
    var label =
      UILabel.alloc().initWithFrame(labelFrame);
    label.setText(
      "This window is constructed on iOS native APIs!"
    );
    label.setTextColor(UIColor.greenColor());
    label.setNumberOfLines(2);
    window.addSubview(label);
    //-------------------------------------------------------- Construct an UIImageView

    // show an image on the window
    var imageViewFrame = {
      x: 30,
      y: 50,
      width: 200,
      height: 200,
    };
    var imageView =
      UIImageView.alloc().initWithFrame(
        imageViewFrame
      );

    var image = UIImage.imageNamed(
      "/var/mobile/Library/AutoTouch/Scripts/Examples/images/cat.png"
    );

    imageView.setImage(image);

    window.addSubview(imageView);

    //--------------------------------------------------------

    // Implementation of animation with Objectiove-C
    // [UIView animateWithDuration:0.2
    //         animations:^{
    // // animations go here
    // }];

    const { width, height } = getScreenInfo();
    const orientation = frontMostAppOrientation();

    let screenWidth, screenHeight;
    if (
      orientation ===
        INTERFACE_ORIENTATION_TYPE.PORTRAIT ||
      orientation ===
        INTERFACE_ORIENTATION_TYPE.PORTRAIT_UPSIDE_DOWN
    ) {
      screenWidth = width;
      screenHeight = height;
    } else {
      screenWidth = height;
      screenHeight = width;
    }

    // iOS animation
    UIView.animateWithDuration_animations(
      3,
      block("void", function () {
        window.setFrame({
          x: screenWidth - 300,
          y: screenHeight - 300,
          width: 300,
          height: 300,
        });
      })
    );

    toast("Delaying 3 seconds to dismiss...");
    // Close the window after 3 seconds
    dispatch_after(3.0, function () {
      window.setHidden(true);
      showAlertView();
    });
  });
};
