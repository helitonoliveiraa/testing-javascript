import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Heliton',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Heliton&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Heliton',
      abilities: ['JS', 'ReactJS'],
    };

    expect(queryString(obj)).toBe('name=Heliton&abilities=JS,ReactJS');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'John',
      abilities: {
        first: 'React',
        second: 'Jest',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Heliton&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Heliton',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Heliton';

    expect(parse(qs)).toEqual({ name: 'Heliton' });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Heliton&abilities=React,Node';

    expect(parse(qs)).toEqual({
      name: 'Heliton',
      abilities: ['React', 'Node'],
    });
  });
});
