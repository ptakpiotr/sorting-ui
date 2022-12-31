import Enumerable from "linq";

function bubbleSort(start: number, data: number[]) {
  let i = start;
  for (; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      let temp = data[i];
      if (data[j] < data[i]) {
        data[i] = data[j];
        data[j] = temp;
      }
    }
  }
}

function selectionSort(end: number, data: number[]) {
  let i = 0;
  for (; i < end - 1; i++) {
    let min = i;
    for (let j = i + 1; j < data.length; j++) {
      if (data[j] < data[min]) {
        min = j;
      }
      [data[min], data[i]] = [data[i], data[min]];
    }
  }
}

function insertionSort(end: number, data: number[]) {
  let key, j;
  for (let i = 1; i < end; i++) {
    key = data[i];
    j = i - 1;
    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      j = j - 1;
    }
    data[j + 1] = key;
  }
}

function countSort(num: number[], data: number[]) {
  let max = Math.max(...num);
  let min = Math.min(...num);

  let range = max - min + 1;
  let count = Enumerable.repeat(0, range).toArray();
  let output = Enumerable.repeat(0, num.length).toArray();
  for (let i = 0; i < num.length; i++) {
    count[num[i] - min]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  for (let i = num.length - 1; i >= 0; i--) {
    output[count[num[i] - min] - 1] = num[i];
    count[num[i] - min]--;
  }

  for (let i = 0; i < num.length; i++) {
    num[i] = output[i];
  }
  data = num;
}

const algorithmsMap = new Map();

algorithmsMap.set("count-sort", countSort);
algorithmsMap.set("bubble-sort", bubbleSort);
algorithmsMap.set("insertion-sort", insertionSort);
algorithmsMap.set("selection-sort", selectionSort);

export default algorithmsMap;
