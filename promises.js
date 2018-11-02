// const promises = 
// Promise.all([
    // delay(3, 1),
    // delay(1, 2),
    // delay(2, 3)
// ]).then(() => console.log('yeeee!'))
const sequent = async () => {
    await delay(3, 1),
    await delay(1, 2),
    await delay(2, 3) 
}
sequent().then(() => console.log('yeeee!'))