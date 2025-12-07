/**
 * @file NativeStorage.ts
 * @brief React Native 存储模块的 TypeScript 接口定义
 *
 * 定义了与原生模块通信的接口规范
 */

import { TurboModuleRegistry, type TurboModule } from 'react-native';

/**
 * @interface Spec
 * @brief 存储模块的接口规范
 *
 * 定义了所有可用的存储操作方法
 */
export interface Spec extends TurboModule {
  /**
   * 设置键值对（增加或修改）
   * @param key 键名
   * @param value 值
   * @returns 操作是否成功
   */
  set(key: string, value: string): boolean;

  /**
   * 获取指定键的值（查询）
   * @param key 键名
   * @returns 对应的值，如果键不存在则返回 null
   */
  get(key: string): string | null;

  /**
   * 删除指定键值对
   * @param key 键名
   * @returns 操作是否成功（键存在则返回 true）
   */
  remove(key: string): boolean;

  /**
   * 检查键是否存在
   * @param key 键名
   * @returns 键存在返回 true，否则返回 false
   */
  has(key: string): boolean;

  /**
   * 清空所有数据
   */
  clear(): void;

  /**
   * 获取存储的键值对数量
   * @returns 键值对数量
   */
  size(): number;

  /**
   * 获取所有键名
   * @returns 包含所有键名的数组
   */
  getAllKeys(): string[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('Storage');
