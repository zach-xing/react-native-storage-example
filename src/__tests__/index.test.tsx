/**
 * @file index.test.tsx
 * @brief 存储模块的单元测试
 *
 * 测试存储模块的所有功能
 */

import { set, get, remove, has, clear, size, getAllKeys } from '../index';

// 模拟原生模块
jest.mock('../NativeStorage', () => ({
  set: jest.fn((key: string, value: string) => {
    // 模拟存储行为
    (global as any).__mockStorage = (global as any).__mockStorage || {};
    (global as any).__mockStorage[key] = value;
    return true;
  }),
  get: jest.fn((key: string) => {
    const storage = (global as any).__mockStorage || {};
    return storage[key] || null;
  }),
  remove: jest.fn((key: string) => {
    const storage = (global as any).__mockStorage || {};
    const exists = key in storage;
    delete storage[key];
    return exists;
  }),
  has: jest.fn((key: string) => {
    const storage = (global as any).__mockStorage || {};
    return key in storage;
  }),
  clear: jest.fn(() => {
    (global as any).__mockStorage = {};
  }),
  size: jest.fn(() => {
    const storage = (global as any).__mockStorage || {};
    return Object.keys(storage).length;
  }),
  getAllKeys: jest.fn(() => {
    const storage = (global as any).__mockStorage || {};
    return Object.keys(storage);
  }),
}));

describe('Storage Module', () => {
  beforeEach(() => {
    // 每个测试前清空存储
    (global as any).__mockStorage = {};
  });

  /**
   * 测试设置和获取功能
   */
  it('should set and get a value', () => {
    const key = 'testKey';
    const value = 'testValue';

    // 设置值
    const setResult = set(key, value);
    expect(setResult).toBe(true);

    // 获取值
    const getValue = get(key);
    expect(getValue).toBe(value);
  });

  /**
   * 测试获取不存在的键
   */
  it('should return null for non-existent key', () => {
    const getValue = get('nonExistentKey');
    expect(getValue).toBeNull();
  });

  /**
   * 测试删除功能
   */
  it('should remove a key', () => {
    const key = 'testKey';
    const value = 'testValue';

    // 设置值
    set(key, value);

    // 删除值
    const removeResult = remove(key);
    expect(removeResult).toBe(true);

    // 确认已删除
    const getValue = get(key);
    expect(getValue).toBeNull();
  });

  /**
   * 测试检查键是否存在
   */
  it('should check if key exists', () => {
    const key = 'testKey';
    const value = 'testValue';

    // 键不存在时
    expect(has(key)).toBe(false);

    // 设置值后
    set(key, value);
    expect(has(key)).toBe(true);

    // 删除后
    remove(key);
    expect(has(key)).toBe(false);
  });

  /**
   * 测试清空功能
   */
  it('should clear all data', () => {
    // 设置多个键值对
    set('key1', 'value1');
    set('key2', 'value2');
    set('key3', 'value3');

    // 清空
    clear();

    // 确认所有键都已删除
    expect(get('key1')).toBeNull();
    expect(get('key2')).toBeNull();
    expect(get('key3')).toBeNull();
    expect(size()).toBe(0);
  });

  /**
   * 测试获取存储大小
   */
  it('should return correct size', () => {
    // 初始大小为 0
    expect(size()).toBe(0);

    // 添加键值对
    set('key1', 'value1');
    expect(size()).toBe(1);

    set('key2', 'value2');
    expect(size()).toBe(2);

    // 删除一个键
    remove('key1');
    expect(size()).toBe(1);
  });

  /**
   * 测试获取所有键名
   */
  it('should get all keys', () => {
    // 设置多个键值对
    set('key1', 'value1');
    set('key2', 'value2');
    set('key3', 'value3');

    // 获取所有键
    const keys = getAllKeys();
    expect(keys).toHaveLength(3);
    expect(keys).toContain('key1');
    expect(keys).toContain('key2');
    expect(keys).toContain('key3');
  });

  /**
   * 测试更新已存在的键
   */
  it('should update existing key', () => {
    const key = 'testKey';

    // 设置初始值
    set(key, 'value1');
    expect(get(key)).toBe('value1');

    // 更新值
    set(key, 'value2');
    expect(get(key)).toBe('value2');

    // 大小应该保持为 1
    expect(size()).toBe(1);
  });
});
