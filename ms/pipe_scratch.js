
/*https://github.com/joelnet/MojiScript/blob/master/type/is.js */
let testFunc = val => typeof val === 'function'

/*https://github.com/joelnet/MojiScript/blob/master/_internal/maybeExec.js */
let maybeEcec = maybefunc => value => (testFunc(maybefunc) ? maybefunc(value) : maybefunc)

/* */
let sleep = ms => v => new Promise (resolve => 
	setTimeout(() => resolve(v), ms)
)

/* */
let log = msg => console.log(msg)





/*https://github.com/joelnet/MojiScript/blob/master/core/pipe/index.js */
let pipe2 = (funcs = []) => 
	funcs.length === 0 
		? (() => {throw Error("pipe/sync requires at least one argument!")})()
		: value => 
			funcs.reduce(
				(acc, func) => acc.then(maybeEcec(func)),
				Promise.resolve(value)
		)