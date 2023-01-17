import Enumerable from "linq";

function bubbleSort(data: number[], i: number, j: number) {
  for (let k = 0; k < 10; k++) {
    if (i < data.length) {
      let temp = data[j];
      if (data[j] > data[j + 1]) {
        data[j] = data[j + 1];
        data[j + 1] = temp;
      }
      j++;

      if (j >= data.length - i - 1) {
        j = 0;
        i++;
      }
    }
  }
  return i;
}

function selectionSort(end: number, data: number[]) {
  let i = 0;
  for (; i <= end - 1; i++) {
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
  for (let i = 1; i <= end; i++) {
    key = data[i];
    j = i - 1;
    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      j = j - 1;
    }
    data[j + 1] = key;
  }
}

function countingSort(num: number, data: number[]) {
  let nums = data.slice(0, num);

  let max = Math.max(...nums);
  let min = Math.min(...nums);

  let range = max - min + 1;
  let count = Enumerable.repeat(0, range).toArray();
  let output = Enumerable.repeat(0, nums.length).toArray();
  for (let i = 0; i < nums.length; i++) {
    count[nums[i] - min]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  for (let i = nums.length - 1; i >= 0; i--) {
    output[count[nums[i] - min] - 1] = nums[i];
    count[nums[i] - min]--;
  }

  for (let i = 0; i < nums.length; i++) {
    nums[i] = output[i];
  }
  return nums;
}

async function quickSort(
  data: number[],
  start: number,
  end: number,
  play: boolean
) {
  if (play) {
    if (start > end) {
      return;
    }
    let index = await partition(data, start, end);

    await Promise.all([
      quickSort(data, start, index - 1, play),
      quickSort(data, index + 1, end, play),
    ]);
  }
}

async function partition(data: number[], start: number, end: number) {
  let pivotIndex = start;
  let pivotElement = data[end];
  for (let i = start; i < end; i++) {
    if (data[i] < pivotElement) {
      await swap(data, i, pivotIndex);
      pivotIndex++;
    }
  }
  await swap(data, end, pivotIndex);
  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
    }
  }
  return pivotIndex;
}

async function swap(data: number[], i: number, j: number) {
  await sleep(200);
  let temp = data[i];
  data[i] = data[j];
  data[j] = temp;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const algorithmsMap = new Map();

algorithmsMap.set("counting-sort", countingSort);
algorithmsMap.set("bubble-sort", bubbleSort);
algorithmsMap.set("insertion-sort", insertionSort);
algorithmsMap.set("selection-sort", selectionSort);
algorithmsMap.set("quick-sort", quickSort);

export default algorithmsMap;
