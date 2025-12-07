/**
 * @file index.tsx
 * @brief React Native Storage 模块的主入口文件
 *
 * 提供简单易用的存储 API，封装了原生模块的调用
 */

import Storage from './NativeStorage';

/**
 * 设置键值对（增加或修改）
 * @param key 键名
 * @param value 值
 * @returns 操作是否成功
 */
export function set(key: string, value: string): boolean {
  return Storage.set(key, value);
}

/**
 * 获取指定键的值（查询）
 * @param key 键名
 * @returns 对应的值，如果键不存在则返回 null
 */
export function get(key: string): string | null {
  return Storage.get(key);
}

/**
 * 删除指定键值对
 * @param key 键名
 * @returns 操作是否成功（键存在则返回 true）
 */
export function remove(key: string): boolean {
  return Storage.remove(key);
}

/**
 * 检查键是否存在
 * @param key 键名
 * @returns 键存在返回 true，否则返回 false
 */
export function has(key: string): boolean {
  return Storage.has(key);
}

/**
 * 清空所有数据
 */
export function clear(): void {
  Storage.clear();
}

/**
 * 获取存储的键值对数量
 * @returns 键值对数量
 */
export function size(): number {
  return Storage.size();
}

/**
 * 获取所有键名
 * @returns 包含所有键名的数组
 */
export function getAllKeys(): string[] {
  return Storage.getAllKeys();
}

// 默认导出所有方法
export default {
  set,
  get,
  remove,
  has,
  clear,
  size,
  getAllKeys,
};
