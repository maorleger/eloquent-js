function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  if (match = /^"([^"]*)"/.exec(program)) 
    expr = {type: "value", value: match[1]};
  else if (match = /^\d+\b/.exec(program))
    expr = {type: "value", value : Number(match[0])};
  else if (match = /^[^\s(),"]/.exec(program))
    expr = {type: "word", name: match[0]};
  else
    throw new SyntaxError("Unexpected syntax: " + program);

  return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(program) {
  var first = program.search(/\S/);
  if (first == -1) return "";
  return program.slice(first);
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",")
      program = skipSpace(program.slice(1));
    else if (program[0] != ")")
      throw new SyntaxError("Expected ',' or ')'");
  }
  return parseApply(expr, program.slice(1));
}

function parse(program) {
  var result = parseExpression(program);
  console.log(result);
  if (skipSpace(result.rest).length > 0) 
    throw new SyntaxError("Unexpected text after program");
  return result.expr;
}


console.log(parse("+(a, 10)"));


function evaluate(expr, env) {
  switch(expr.type) {
    case "value":
      return expr.value;
    case "word":
      if (expr.name in env)
        return env[expr.name];
      else
        throw new ReferenceError("Undefined variable: " + expr.name);
    case "apply":
      if (expr.operator.type == "word" && expr.operator.name in specialForms)
        return specialForms[expr.operator.name](expr.args, env);
      var op = evaluate(expr.operator, env);
      if (typeof op != "function")
        throw new TypeError("Applying a non-function.");
      return op.apply(null, expr.args.map(function(arg) {
        return evaluate(arg, env);
      }));
  }
}

var specialForms = Object.create(null);

specialForms["if"] = function(args, env) {
  if (args.length != 3) 
    throw new SyntaxError("Bad number of args to if");
  if (evaluate(args[0], env) !== false)
    return evaluate(args[1], env);
  else
    return evaluate(args[2], env);
};

specialForms["while"] = function(args, env) {
  if (args.length != 2) 
    throw new SyntaxError("Bad number of args to while");
  while(evaluate(args[0], env) !== false)
    evaluate(args[1], env);
  
  return false;
};

specialForms["do"] = function(args, env) {
  var value = false;
  args.forEach(function(arg) { value = evaluate(arg, env); });
  return value;
}

specialForms["define"] = function(args, env) {
  if (args.length != 2)
    throw new SyntaxError("Bad number of args to define");
  var value = evaluate(args[1], env);
  env[args[0].name] = value;
  return value;
}

var topEnv = Object.create(null);
topEnv["false"] = false;
topEnv["true"] = true;

var prog = parse("if(true, false, true)");
console.log(evaluate(prog, topEnv));

specialForms["array"] = function(args, env) {
  return Array.prototype.slice.call(args, 0);
}
