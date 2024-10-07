function findBalance(arr){
    const totalSum = arr.reduce((acc,num)=>acc+num,0);
    let leftSum =0;
    for(let i =0;i<arr.length;i++){
        const rightSum = totalSum -leftSum - arr[i];
        if(leftSum===rightSum){
            return i // return the index
        }
        leftSum+=arr[i]
    }


    
    return -1;

}

/** @here I've declare variable's name and passing in function  */

const arr1 = [1,7,3,6,5,6];

const arr2 = [1,2,3,4,5]

const arr3 = [2,1, -1,2,1,-1,2];

const arr4 = [0, -1,1, 0];

const arr5 = [1, 0,-1, 0];

const arr6 = [2, 2, 2, 2, 2, 2];


console.log("arr1", findBalance(arr1))

console.log("arr2", findBalance(arr2))

console.log("arr3", findBalance(arr3))

console.log("arr4", findBalance(arr4))

console.log("arr5", findBalance(arr5))

console.log("arr6", findBalance(arr6))