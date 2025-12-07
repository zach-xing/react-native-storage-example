/**
 * @file Storage.cpp
 * @brief 简单的键值存储系统实现文件
 *
 * 实现了线程安全的基本增删改查功能
 */

#include "Storage.h"
#include <sstream>

namespace storage {

/**
 * 构造函数 - 初始化存储对象
 */
SimpleStorage::SimpleStorage() {
    // 初始化空的存储映射
}

/**
 * 析构函数 - 清理资源
 */
SimpleStorage::~SimpleStorage() {
    // 自动清理 std::map 和 std::mutex
}

/**
 * 设置键值对
 * 如果键已存在，则更新其值；如果不存在，则创建新的键值对
 */
bool SimpleStorage::set(const std::string& key, const std::string& value) {
    // 加锁以确保线程安全
    std::lock_guard<std::mutex> lock(mutex_);

    try {
        // 插入或更新键值对
        storage_[key] = value;
        return true;
    } catch (const std::exception& e) {
        // 捕获可能的异常（如内存不足）
        return false;
    }
}

/**
 * 获取指定键的值
 * 使用 std::optional 来表示键可能不存在的情况
 */
std::optional<std::string> SimpleStorage::get(const std::string& key) {
    // 加锁以确保线程安全
    std::lock_guard<std::mutex> lock(mutex_);

    // 查找键
    auto it = storage_.find(key);

    // 如果找到，返回值；否则返回空
    if (it != storage_.end()) {
        return it->second;
    }

    return std::nullopt;
}

/**
 * 删除指定键值对
 * 返回操作是否成功（键是否存在）
 */
bool SimpleStorage::remove(const std::string& key) {
    // 加锁以确保线程安全
    std::lock_guard<std::mutex> lock(mutex_);

    // 尝试删除键，返回删除的元素数量
    // 如果返回 1 表示成功删除，0 表示键不存在
    return storage_.erase(key) > 0;
}

/**
 * 检查键是否存在
 */
bool SimpleStorage::has(const std::string& key) {
    // 加锁以确保线程安全
    std::lock_guard<std::mutex> lock(mutex_);

    // 使用 find 查找键是否存在
    return storage_.find(key) != storage_.end();
}

/**
 * 清空所有存储的数据
 */
void SimpleStorage::clear() {
    // 加锁以确保线程安全
    std::lock_guard<std::mutex> lock(mutex_);

    // 清空映射表
    storage_.clear();
}

/**
 * 获取当前存储的键值对数量
 */
size_t SimpleStorage::size() {
    // 加锁以确保线程安全
    std::lock_guard<std::mutex> lock(mutex_);

    // 返回映射表大小
    return storage_.size();
}

/**
 * 获取所有键名
 * 返回用逗号分隔的键名字符串
 */
std::string SimpleStorage::getAllKeys() {
    // 加锁以确保线程安全
    std::lock_guard<std::mutex> lock(mutex_);

    // 如果存储为空，返回空字符串
    if (storage_.empty()) {
        return "";
    }

    // 使用 stringstream 构建结果字符串
    std::ostringstream oss;
    bool first = true;

    // 遍历所有键
    for (const auto& pair : storage_) {
        if (!first) {
            oss << ",";
        }
        oss << pair.first;
        first = false;
    }

    return oss.str();
}

} // namespace storage

