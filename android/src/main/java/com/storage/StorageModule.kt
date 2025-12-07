/**
 * @file StorageModule.kt
 * @brief Android 平台的存储模块实现文件
 *
 * 使用 Kotlin 实现线程安全的键值存储功能
 */

package com.storage

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.module.annotations.ReactModule
import java.util.concurrent.ConcurrentHashMap

/**
 * @class StorageModule
 * @brief Android 存储模块实现类
 *
 * 实现了 NativeStorageSpec 规范，提供线程安全的存储功能
 * 使用 ConcurrentHashMap 作为底层存储
 */
@ReactModule(name = StorageModule.NAME)
class StorageModule(reactContext: ReactApplicationContext) :
  NativeStorageSpec(reactContext) {

  // 使用 ConcurrentHashMap 实现线程安全的存储
  private val storage = ConcurrentHashMap<String, String>()

  /**
   * 获取模块名称
   * @return 模块名称
   */
  override fun getName(): String {
    return NAME
  }

  /**
   * 设置键值对（增加或修改）
   * @param key 键名
   * @param value 值
   * @return 操作是否成功
   */
  override fun set(key: String, value: String): Boolean {
    return try {
      // 存储键值对
      storage[key] = value
      true
    } catch (e: Exception) {
      // 捕获可能的异常
      false
    }
  }

  /**
   * 获取指定键的值（查询）
   * @param key 键名
   * @return 对应的值，如果键不存在则返回 null
   */
  override fun get(key: String): String? {
    // 从存储中获取值
    return storage[key]
  }

  /**
   * 删除指定键值对
   * @param key 键名
   * @return 操作是否成功（键存在则返回 true）
   */
  override fun remove(key: String): Boolean {
    // 删除键值对，如果键存在返回 true
    return storage.remove(key) != null
  }

  /**
   * 检查键是否存在
   * @param key 键名
   * @return 键存在返回 true，否则返回 false
   */
  override fun has(key: String): Boolean {
    // 检查键是否存在
    return storage.containsKey(key)
  }

  /**
   * 清空所有数据
   */
  override fun clear() {
    // 清空存储
    storage.clear()
  }

  /**
   * 获取存储的键值对数量
   * @return 键值对数量
   */
  override fun size(): Double {
    // 返回存储大小（转换为 Double 以匹配接口）
    return storage.size.toDouble()
  }

  /**
   * 获取所有键名
   * @return 包含所有键名的数组
   */
  override fun getAllKeys(): ReadableArray {
    // 创建可写数组
    val keys = WritableNativeArray()

    // 遍历所有键并添加到数组
    for (key in storage.keys) {
      keys.pushString(key)
    }

    return keys
  }

  companion object {
    // 模块名称常量
    const val NAME = "Storage"
  }
}
