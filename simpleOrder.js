

let arr = [ 6, 33, 7, 9, 1, 33, 25, 333, 8, 9, 10, 44, 2, 506, 8695, 305, 105, 664 ];



function order() {
    this.asc = (arr, desc) => {
        
        let i, j, tmp;
        let len = arr.length-1;
        for (i = 0; i <= len; i++) {
            
            for (j = i + 1; j <= len; j++) {
                
                if (i == j) {
                    continue;
                }

                if (desc && arr[j] > arr[i] || !desc && arr[j] < arr[i]) {
                    tmp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = tmp;
                }
            }

        };
        return arr;
    },
    this.desc = (arr) => {
        return this.asc(arr, 'des')
    }
}
