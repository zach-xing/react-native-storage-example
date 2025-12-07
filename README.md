# React Native Storage 学习 Demo

```
react-native-storage/
├── cpp/                    # C++ 核心实现（iOS 使用）
│   ├── Storage.h          # C++ 存储类头文件
│   └── Storage.cpp        # C++ 存储类实现
├── ios/                   # iOS 平台实现
│   ├── Storage.h          # iOS 模块头文件
│   └── Storage.mm         # iOS 模块实现（Objective-C++）
├── android/               # Android 平台实现
│   └── src/main/java/com/storage/
│       ├── StorageModule.kt    # Android 模块实现（Kotlin）
│       └── StoragePackage.kt   # Android 包定义
├── src/                   # JavaScript/TypeScript 接口
│   ├── index.tsx          # 导出的 API
│   └── NativeStorage.ts   # TurboModule 接口定义
└── example/               # 示例应用
    └── src/App.tsx        # 完整的使用示例
```
