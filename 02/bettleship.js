/*
   * 编写程序前，使用伪代码粗略地描绘一下程序需要完成的任务
   * 伪代码 无需编写实际代码就能彻底弄清楚程序的运行过程(你用中文或英文或其它方式写下的运行过程的代码-顺序-循环-判断) (下面的(战舰游戏)伪代码由两部分组成，第一部分描述需要的变量 第二部分描述了程序的逻辑 变量指出了要在代码中记录哪些东西 而逻辑指出了要创建这个游戏必须如实地实现哪些代码)
   * prompt浏览器内置函数，用来获取用户输入 显示对话框包含你指定的字符串 还提供了让用户响应的区域 作为函数调用结果以字符串的形式返回 如果用户取消或没有输入返回null
   *
   *
   * 无限循环 循环必须包含条件测试，只要循环测试为true,循环就继续。如果代码没有可导致条件测试最终变为false的因素，循环将不断进行下去，直到浏览器或重启计算机
   * 布尔运算符用于结果为true或false的布尔表达式中。有两种布尔运算符：比较运算符和逻辑运算符，布尔运算能编写更复杂的逻辑语句。
   * 比较运算符 对于两个值进行比较 <表示小于 >表示大于 ==表示等于 ===表示正好等于 <=表示小于 >=表示大于 !=表示不等于
   *
   * 逻辑运算符 将两个布尔表达式合二为一，得到一个布尔结果(true或false)
   * || 表示OR(或) 只要有一个为true，整个条件为true，两个测试都为false，则整个条件为false
   * && 表示AND(与) 仅当两个测试都为true时，结果才为true
   * ！表示NOT(非) 仅当表达式为false时，结果才为true
   * 使用()对条件进行编组先获得运算结果
   * 随机数函数Math.random 返回一个0～1(包括0但不包括1)的随机数 例如：Math.random()*1=0.999999(最大随机数为)0.11(最小随机数)
   * 向下取整函数Math.floor 将小数取最为接近的(小于或等于)整数 例如：Math.floor(45.95)=45   Math.floor(-45.05)=46
   *
   *
   *
   * */


//指定位置
/*var location1 = 3;
var location2 = 4;
var location3 = 5;*/


//生成随机数 取整小于5的数
var randomLoc = Math.floor(Math.random() * 5);

var location1 =randomLoc;
var location2 = randomLoc + 1;
var location3 = location2 + 1;

var guess;//用户猜测
var hits = 0;//击中
var guesses = 0;//猜测次数
var isSunk = false;//是否击沉

while (isSunk == false) {

    guess = prompt("Ready, aim, fire! (enter a number from 0-6):");

    if (guess < 0 || guess > 6) {
        alert("Please enter a valid cell number!");
    } else {
        guesses = guesses + 1;
    }

    if (guesses == location1 || guesses == location2 || guesses == location3) {
        alert("HIT");
        hits = hits + 1;

        if (hits == 3) {
            isSunk = true;
            alert("You sank my battleship!");
        }
    } else {
        alert("MISS");
    }
}

var stats = "You took" + guesses + "guesses to sink the battleship," + "which means your shooting accuracy was " + (3 / guesses);
alert(stats);

//列子2
if (inStock == true) {
    if (onSale == true) {
        //好像很划算
        alert("buy buy buy!");
    }
}

if (inStock == true && onSale == true) {
    alert("buy buy buy!");
}

if (inStock == true && (onSale == true || price < 60)) {
    //好像很划算
    alert("buy buy buy!");
}


if (inStock == true) {
}

/*
* 修改为
* 如果inStock为false，条件测试将失败，进而跳过代码块
* 仅使用布尔变量本身时，只要该变量为true，条件测试就为true，进而执行相应的代码块
* */
if (inStock) {

}


