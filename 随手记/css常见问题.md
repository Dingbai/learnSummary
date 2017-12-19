### css常见问题
#### 设置placeholder样式

```css
 input::-webkit-input-placeholder {
    color: #989898;
}
```

#### 强制换行

```css
#warp {
    /* 方法一 */
    width:300px;
    word-wrap:break-world;
    /* 方法二 */
    word-break:break-all;
    /* 兼容Firefox */
    overflow:auto;
}
```