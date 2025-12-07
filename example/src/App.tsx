/**
 * @file App.tsx
 * @brief 存储模块示例应用
 *
 * 展示如何使用存储模块的各种功能
 */

import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  set,
  get,
  remove,
  has,
  clear,
  size,
  getAllKeys,
} from 'react-native-storage';

export default function App() {
  // 状态管理
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [storageSize, setStorageSize] = useState(0);
  const [allKeys, setAllKeys] = useState<string[]>([]);

  /**
   * 更新存储信息显示
   */
  const updateStorageInfo = () => {
    setStorageSize(size());
    setAllKeys(getAllKeys());
  };

  /**
   * 处理设置键值对
   */
  const handleSet = () => {
    if (!key || !value) {
      Alert.alert('错误', '请输入键和值');
      return;
    }

    const success = set(key, value);
    if (success) {
      setResult(`成功设置: ${key} = ${value}`);
      updateStorageInfo();
    } else {
      setResult('设置失败');
    }
  };

  /**
   * 处理获取值
   */
  const handleGet = () => {
    if (!key) {
      Alert.alert('错误', '请输入键');
      return;
    }

    const retrievedValue = get(key);
    if (retrievedValue !== null) {
      setResult(`获取到的值: ${retrievedValue}`);
      setValue(retrievedValue);
    } else {
      setResult(`键 "${key}" 不存在`);
    }
  };

  /**
   * 处理删除键值对
   */
  const handleRemove = () => {
    if (!key) {
      Alert.alert('错误', '请输入键');
      return;
    }

    const success = remove(key);
    if (success) {
      setResult(`成功删除: ${key}`);
      updateStorageInfo();
    } else {
      setResult(`键 "${key}" 不存在`);
    }
  };

  /**
   * 处理检查键是否存在
   */
  const handleHas = () => {
    if (!key) {
      Alert.alert('错误', '请输入键');
      return;
    }

    const exists = has(key);
    setResult(exists ? `键 "${key}" 存在` : `键 "${key}" 不存在`);
  };

  /**
   * 处理清空所有数据
   */
  const handleClear = () => {
    Alert.alert('确认', '确定要清空所有数据吗？', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: () => {
          clear();
          setResult('已清空所有数据');
          updateStorageInfo();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>React Native Storage 示例</Text>

        {/* 输入区域 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="输入键 (Key)"
            value={key}
            onChangeText={setKey}
          />
          <TextInput
            style={styles.input}
            placeholder="输入值 (Value)"
            value={value}
            onChangeText={setValue}
          />
        </View>

        {/* 操作按钮 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSet}>
            <Text style={styles.buttonText}>设置 (Set)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleGet}>
            <Text style={styles.buttonText}>获取 (Get)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRemove}>
            <Text style={styles.buttonText}>删除 (Remove)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleHas}>
            <Text style={styles.buttonText}>检查 (Has)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
          >
            <Text style={styles.buttonText}>清空 (Clear)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={updateStorageInfo}>
            <Text style={styles.buttonText}>刷新信息</Text>
          </TouchableOpacity>
        </View>

        {/* 结果显示 */}
        {result ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>结果:</Text>
            <Text style={styles.resultText}>{result}</Text>
          </View>
        ) : null}

        {/* 存储信息 */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>存储信息</Text>
          <Text style={styles.infoText}>数量: {storageSize}</Text>
          <Text style={styles.infoText}>
            所有键: {allKeys.length > 0 ? allKeys.join(', ') : '无'}
          </Text>
        </View>

        {/* 使用说明 */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>使用说明:</Text>
          <Text style={styles.instructionsText}>
            1. 输入键和值，点击"设置"保存数据{'\n'}
            2. 输入键，点击"获取"查询数据{'\n'}
            3. 输入键，点击"删除"移除数据{'\n'}
            4. 输入键，点击"检查"确认键是否存在{'\n'}
            5. 点击"清空"删除所有数据
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 16,
    color: '#1B5E20',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  instructionsContainer: {
    backgroundColor: '#FFF3E0',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#FFB74D',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E65100',
  },
  instructionsText: {
    fontSize: 14,
    color: '#BF360C',
    lineHeight: 20,
  },
});
