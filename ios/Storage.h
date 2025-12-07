/**
 * @file Storage.h
 * @brief iOS 平台的存储模块头文件
 *
 * 定义了 iOS 平台的原生存储模块接口
 */

#import <StorageSpec/StorageSpec.h>

/**
 * @interface Storage
 * @brief iOS 存储模块实现类
 *
 * 实现了 NativeStorageSpec 协议，提供存储功能
 */
@interface Storage : NSObject <NativeStorageSpec>

@end
