## 控制台中直接访问页面元素

在元素面板选择一个元素,然后在控制台输入$0,就会在控制台中得到刚才选中的元素。如果页面中已经包含了jQuery,你也可以使用$(\$0)来进行选择。

你也可以反过来,在控制台输出的 DOM 元素上右键选择 Reveal in Elements Panel 来直接在 DOM 树种查看。

![$0](./images/$0.gif)

## 访问最近的控制台结果。

在控制台输入\$\_可以获控制台最近一次的输出结果。

![$_](./images/$_.gif)

## 使用 console.dir

console.dir(object)命令可以列出参数 object 的所有对象属性。

![dir](./images/dir.gif)

## 复制 copy

你可以通过 copy 方法在控制台里复制你想要的东西。

![copy](./images/copy.gif)
