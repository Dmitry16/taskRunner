const delay = (seconds, num) => {
    return new Promise( resolve => {
        setTimeout( () => {
            resolve(console.log(`kuku from N${num}`))
        }, seconds * 1000)
    })
}
const tasks = [
    delay(3, 1),
    delay(1, 2),
    delay(2, 3),
    delay(4, 4),
    delay(1, 5),
]
class PromiseQue {
    constructor(promises = [], concurrentCount = 1) {
        this.concurrents = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.complete = [];
    }
    get runAnother() {
        return (this.running.length < this.concurrents) && this.todo.length;
    }
    run() {
        while(this.runAnother) {
            const promise = this.todo.shift();
            promise.then(() => {
                this.complete.push(this.running.shift());
                this.run();
            });
            this.running.push(promise);
        }
    }
}
const delayQueue = new PromiseQue(tasks, 2)
delayQueue.run()