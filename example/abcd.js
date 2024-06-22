// const data = [{name : "darshan", email : "darsha@gmail.com"}, {name : "rikesh", email : "rinkesh@gmail.com"}]

// function getData() {
//     setTimeout(() => {
//         data.forEach((data, index) => {
//             console.log('Data:' , data);
//         })
//     }, 3000);
// }

// function createData(newData, callback){
//     setTimeout(() => {
//         data.push(newData)
//         callback()
//     }, 1000);
// }

// getData()
// createData({name : "duggu  ", email : "duggu@gmail.com"}, getData)



function register(callback){
    setTimeout(() => {
        console.log('Register the user');
        callback()
    }, 2000);
}
function sendmail(callback){
    setTimeout(() => {
        console.log('Sendmail the user');
        callback()
    }, 1000);
}
function login(callback){
    setTimeout(() => {
        console.log('Login the user');
        callback()
    }, 1000);
}
function getuser(callback){
    setTimeout(() => {
        console.log('Get usre user');
        callback()
    }, 1000);
}
function display(callback){
    setTimeout(() => {
        console.log('Display the user');
        callback()
    }, 1000);
}
 
//  this called ---->>    callback hall and  peramiter doom
register(function(){
    sendmail(function(){
        login(function(){
            getuser(function(){
                display(function(){

                })
            })
        })
    })
})