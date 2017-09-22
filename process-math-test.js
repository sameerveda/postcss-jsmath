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

function test(string) {
    let s = math.process(string);
    try {
        console.log(string, " => ", s);
    } catch (error) {
        console.log(string, "  => ", "failed");
    }
}