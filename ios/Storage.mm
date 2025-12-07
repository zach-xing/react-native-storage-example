/**
 * @file Storage.mm
 * @brief iOS 平台的存储模块实现文件
 *
 * 使用 C++ 存储引擎实现 iOS 平台的存储功能
 */

#import "Storage.h"
#include "../cpp/Storage.h"
#include <memory>

@implementation Storage {
    // C++ 存储引擎实例
    std::shared_ptr<storage::SimpleStorage> _storage;
}

/**
 * 初始化方法 - 创建 C++ 存储引擎实例
 */
- (instancetype)init {
    self = [super init];
    if (self) {
        // 创建 C++ 存储对象
        _storage = std::make_shared<storage::SimpleStorage>();
    }
    return self;
}

/**
 * 设置键值对
 * @param key 键名
 * @param value 值
 * @return 操作是否成功（NSNumber 包装的布尔值）
 */
- (NSNumber *)set:(NSString *)key value:(NSString *)value {
    if (!key || !value) {
        return @(NO);
    }

    // 将 NSString 转换为 std::string
    std::string cppKey = [key UTF8String];
    std::string cppValue = [value UTF8String];

    // 调用 C++ 存储引擎
    bool result = _storage->set(cppKey, cppValue);
    return @(result);
}

/**
 * 获取指定键的值
 * @param key 键名
 * @return 对应的值，如果键不存在则返回 nil
 */
- (NSString *)get:(NSString *)key {
    if (!key) {
        return nil;
    }

    // 将 NSString 转换为 std::string
    std::string cppKey = [key UTF8String];

    // 调用 C++ 存储引擎
    auto result = _storage->get(cppKey);

    // 如果找到值，转换为 NSString 返回
    if (result.has_value()) {
        return [NSString stringWithUTF8String:result.value().c_str()];
    }

    return nil;
}

/**
 * 删除指定键值对
 * @param key 键名
 * @return 操作是否成功（NSNumber 包装的布尔值）
 */
- (NSNumber *)remove:(NSString *)key {
    if (!key) {
        return @(NO);
    }

    // 将 NSString 转换为 std::string
    std::string cppKey = [key UTF8String];

    // 调用 C++ 存储引擎
    bool result = _storage->remove(cppKey);
    return @(result);
}

/**
 * 检查键是否存在
 * @param key 键名
 * @return 键存在返回 YES，否则返回 NO（NSNumber 包装的布尔值）
 */
- (NSNumber *)has:(NSString *)key {
    if (!key) {
        return @(NO);
    }

    // 将 NSString 转换为 std::string
    std::string cppKey = [key UTF8String];

    // 调用 C++ 存储引擎
    bool result = _storage->has(cppKey);
    return @(result);
}

/**
 * 清空所有数据
 */
- (void)clear {
    // 调用 C++ 存储引擎
    _storage->clear();
}

/**
 * 获取存储的键值对数量
 * @return 键值对数量（NSNumber 包装的数字）
 */
- (NSNumber *)size {
    // 调用 C++ 存储引擎并转换为 NSNumber
    size_t count = _storage->size();
    return @(static_cast<double>(count));
}

/**
 * 获取所有键名
 * @return 包含所有键名的数组
 */
- (NSArray<NSString *> *)getAllKeys {
    // 调用 C++ 存储引擎获取逗号分隔的键名字符串
    std::string keysStr = _storage->getAllKeys();

    // 如果为空，返回空数组
    if (keysStr.empty()) {
        return @[];
    }

    // 将 C++ 字符串转换为 NSString
    NSString *nsKeysStr = [NSString stringWithUTF8String:keysStr.c_str()];

    // 按逗号分割字符串
    NSArray<NSString *> *keys = [nsKeysStr componentsSeparatedByString:@","];

    return keys;
}

/**
 * 获取 TurboModule 实例
 */
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeStorageSpecJSI>(params);
}

/**
 * 返回模块名称
 */
+ (NSString *)moduleName
{
  return @"Storage";
}

@end
