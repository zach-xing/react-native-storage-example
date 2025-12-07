/**
 * @file Storage.h
 * @brief 简单的键值存储系统头文件
 *
 * 提供基本的增删改查功能，使用内存映射存储数据
 */

#ifndef STORAGE_H
#define STORAGE_H

#include <string>
#include <map>
#include <mutex>
#include <optional>

namespace storage {

/**
 * @class SimpleStorage
 * @brief 线程安全的简单键值存储类
 *
 * 使用 std::map 作为底层存储，提供基本的 CRUD 操作
 * 所有操作都是线程安全的
 */
class SimpleStorage {
public:
    /**
     * @brief 构造函数
     */
    SimpleStorage();

    /**
     * @brief 析构函数
     */
    ~SimpleStorage();

    /**
     * @brief 设置键值对（增加或修改）
     * @param key 键名
     * @param value 值
     * @return 操作是否成功
     */
    bool set(const std::string& key, const std::string& value);

    /**
     * @brief 获取指定键的值（查询）
     * @param key 键名
     * @return 如果键存在返回对应的值，否则返回 std::nullopt
     */
    std::optional<std::string> get(const std::string& key);

    /**
     * @brief 删除指定键值对
     * @param key 键名
     * @return 操作是否成功（键存在则返回 true）
     */
    bool remove(const std::string& key);

    /**
     * @brief 检查键是否存在
     * @param key 键名
     * @return 键存在返回 true，否则返回 false
     */
    bool has(const std::string& key);

    /**
     * @brief 清空所有数据
     */
    void clear();

    /**
     * @brief 获取存储的键值对数量
     * @return 键值对数量
     */
    size_t size();

    /**
     * @brief 获取所有键名
     * @return 包含所有键名的字符串，用逗号分隔
     */
    std::string getAllKeys();

private:
    // 存储数据的映射表
    std::map<std::string, std::string> storage_;

    // 用于线程安全的互斥锁
    mutable std::mutex mutex_;
};

} // namespace storage

#endif // STORAGE_H

