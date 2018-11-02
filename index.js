const logUpdate = require('log-update');

const delay = (seconds) => {
    return new Promise( resolve => { setTimeout( resolve, seconds * 1000) })
}
const tasks = [
    delay(3),
    delay(4),
    delay(5),
    delay(1),
    delay(10),
    delay(2),
    delay(3),
    delay(4),
    delay(6),
]
class PromiseQue {
    constructor(promises = [], concurrentCount = 1) {
        this.concurrents = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.complete = [];
        this.runningTime = 0;
    }
    get runAnother() {
        return (this.running.length < this.concurrents) && this.todo.length;
    }
    graphTasks() {
        const { todo, running, complete } = this;
        logUpdate(`
            todo[${todo.map(toX)} N${todo.length}]
            running[${running.map(toX)} N${running.length}]
            complete[${complete.map(toX)} N${complete.length}]
            running time: ${this.timer()}
        `);
    }
    timer() {
        setTimeout(() => this.runningTime++, 1000)
        return this.runningTime
    }
    run() {
        while(this.runAnother) {
            const promise = this.todo.shift();
            promise.then(() => {
                this.complete.push(this.running.shift());
                this.graphTasks();
                this.run();
            });
            this.running.push(promise);
            this.graphTasks();
        }
    }
}
const toX = () => 'X';
const delayQueue = new PromiseQue(tasks, 3)
delayQueue.run()