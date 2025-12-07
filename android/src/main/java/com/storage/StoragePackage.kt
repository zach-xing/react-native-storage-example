/**
 * @file StoragePackage.kt
 * @brief Android 平台的存储模块包定义文件
 *
 * 定义了 React Native 模块的注册和配置信息
 */

package com.storage

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

/**
 * @class StoragePackage
 * @brief 存储模块的包类
 *
 * 负责向 React Native 注册存储模块
 */
class StoragePackage : BaseReactPackage() {
  /**
   * 根据模块名称获取模块实例
   * @param name 模块名称
   * @param reactContext React 应用上下文
   * @return 模块实例，如果名称不匹配则返回 null
   */
  override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
    return if (name == StorageModule.NAME) {
      StorageModule(reactContext)
    } else {
      null
    }
  }

  /**
   * 提供模块信息
   * @return 模块信息提供者
   */
  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
    return ReactModuleInfoProvider {
      val moduleInfos: MutableMap<String, ReactModuleInfo> = HashMap()
      // 配置存储模块的信息
      moduleInfos[StorageModule.NAME] = ReactModuleInfo(
        StorageModule.NAME,
        StorageModule.NAME,
        false,  // canOverrideExistingModule - 不能覆盖已存在的模块
        false,  // needsEagerInit - 不需要急切初始化
        false,  // isCxxModule - 不是 C++ 模块
        true // isTurboModule - 是 TurboModule
      )
      moduleInfos
    }
  }
}
