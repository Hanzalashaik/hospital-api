import { v4 as uuidv4 } from 'uuid';

let randomId =()=>{
    return uuidv4();
}

export default randomId;
// function randomString(length) {
//     return Array.from({ length }, () =>
//         'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//             .charAt(Math.floor(Math.random() * 62))//0 to 61
//     ).join('');
// }
// let array='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

// let id=array.charAt(Math.floor(Math.random()*62));
// // console.log(id);
// let len=34
// let arr2=Array.from({len},()=>id).join('');
// console.log(arr2);


// function randomString() {
//     let uId = Math.random().toString(36).substring(2,10)
//     console.log(uId);
    
// }

// console.log(randomString(5));

