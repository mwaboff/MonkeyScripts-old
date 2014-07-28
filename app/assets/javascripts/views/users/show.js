MonkeyScripts.Views.UserShow = MonkeyScripts.Views.ParentShow.extend({
  template: JST["user/show"],

  selector: "#user-stuff",

  subviewsByFragment: {
    '*': MonkeyScripts.Views.UserShowDescription
  }
});