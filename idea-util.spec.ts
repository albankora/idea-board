import {
  errorIfKeysDontExistOnObject,
  ifUndefinedUseSecondParam,
  areEqualArrays
} from "./idea-util"

test('error is thrown when key is missing', () => {
  const obj = {
    _test: "test me"
  }
  expect(() => {
    errorIfKeysDontExistOnObject(['foo'], obj)
  }).toThrowError();
});

test('no error when keys are present', () => {
  class TestMe {
    private _test: string
    private _foo: string
    constructor(foo: string, test: string,) {
      this._test = test
      this._foo = foo
    }
  }

  const obj = new TestMe("test1", "test2")
  expect(() => {
    errorIfKeysDontExistOnObject(['test', 'foo'], obj, "_")
  }).not.toThrowError();
});

test('first param is undefined fallback to second one', () => {
  const foo = ifUndefinedUseSecondParam(undefined, "foo")
  expect(foo).toEqual("foo")
});

test('first param is defined and use it', () => {
  const foo = ifUndefinedUseSecondParam<string>("baz", "foo")
  expect(foo).toEqual("baz")
});


test('equal arrays', () => {
  expect(areEqualArrays(["123", 987, 123, true], ["123", 123, true, 987])).toBeTruthy()
});

test('non equal arrays', () => {
  expect(areEqualArrays<unknown>(["123"], [123])).toBeFalsy()
});
