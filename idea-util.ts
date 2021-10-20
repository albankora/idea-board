import { Idea } from "./idea"
import { UpdateType } from "./types"

export function ifUndefinedUseSecondParam<T>(firstParam: T | undefined, secondParam: T): T {
  if (firstParam === undefined) {
    return secondParam
  }
  return firstParam
}

export function trackNotifyForUpdate(idea: Idea, ideaProps: UpdateType): Array<string> {
  errorIfKeysDontExistOnObject(idea.notifyOnUpdate, idea)
  const notifyFor = []
  for (const i of idea.notifyOnUpdate) {
    const prefixedI = `_${i}`
    // @ts-ignore
    if (Array.isArray(idea[prefixedI]) && Array.isArray(ideaProps[i]) && areEqualArrays(idea[prefixedI], ideaProps[i]) === false) {
      // @ts-ignore
      notifyFor.push(i)
    }
    // @ts-ignore
    if (Array.isArray(idea[prefixedI]) === false && idea[prefixedI] !== ideaProps[i]) {
      // @ts-ignore
      notifyFor.push(i)
    }
  }
  return notifyFor
}

export function errorIfKeysDontExistOnObject(keysList: Array<string>, objToBeChecked: Object, prefix: string = ""): Array<string> {
  for (const i of keysList) {
    if (objToBeChecked.hasOwnProperty(`_${i}`) === false) {
      throw new Error("NotifyOnUpdate variable does not exist!!!")
    }
  }

  return keysList
}

export function areEqualArrays<T>(firstArray: Array<T>, secondArray: Array<T>) {
  const firstArraySorted = firstArray.slice().sort();
  const result = firstArraySorted.length === secondArray.length && secondArray.slice().sort().every(function (value, index) {
    return value === firstArraySorted[index];
  });

  return result
} 
