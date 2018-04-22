const math = require('./process-math.js');

test(".val-math(1+1), .val-math(2+2)");
test("math(11+11), math(22+22)");
test("math(11+11)math(22+22)");
test("math(65515/8/1024)");
test("math(Sqrt(e+1+Sqrt(25)+Abs(-10)))");
test("math(sqrt(e+1+sqrt(25)+abs(-10)))");
test("math(floor(sqrt(e+1+sqrt(25)+abs(-10))))");
test("linear-gradient(90deg, black math(100/3)%, red math(100/3)%, blue math(100/3)%)");
test("math()");
test("math((2-1)*-100)px")

math.set({
    r: 8.3144598,
    sum(...numbers) {
        return numbers.reduce((x, y) => x + y);
    },
    firstNumber(...numbers) {
        return numbers[0];
    }
});

test("math(sum(1, 2, 3, 5, 6))");
test("math(firstnumber(111, 2, 4, 5))");
test("math(r)");
test("math(floor(random()*100))");
test("math(floor(random()*100))");

function test(string) {
    let s = math.process(string);
    try {
        console.log(string, " => ", yellow(s));
    } catch (error) {
        console.log(string, "  => ", red("failed"));
    }

	}
	
	function green(obj){
		return "\u001b[32m"+obj+"\u001b[0m";
	}
	
	function yellow(obj){
		return "\u001b[33m"+obj+"\u001b[0m";
	}
	
function  red(obj){
	return  "\u001b[31m"+ obj +  "\u001b[0m";
	}