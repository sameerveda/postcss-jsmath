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

function test(string) {
    try {
        let s = math.process(string);
        console.log(string, " => ", s);
    } catch (error) {
        console.log(string, "  => ", "failed");
    }
}