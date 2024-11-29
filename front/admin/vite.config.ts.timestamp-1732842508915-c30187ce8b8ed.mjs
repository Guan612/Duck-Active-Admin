// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/CODE/web/project/Duck-Active-Admin/front/admin/node_modules/.pnpm/vite@5.4.10_@types+node@20.17.1/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/CODE/web/project/Duck-Active-Admin/front/admin/node_modules/.pnpm/@vitejs+plugin-vue@5.1.4_vite@5.4.10_@types+node@20.17.1__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///D:/CODE/web/project/Duck-Active-Admin/front/admin/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.1_rollup@4.24.2_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///D:/CODE/web/project/Duck-Active-Admin/front/admin/node_modules/.pnpm/unplugin-vue-components@0.27.4_@babel+parser@7.26.1_rollup@4.24.2_vue@3.5.12_typescript@5.6.3_/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///D:/CODE/web/project/Duck-Active-Admin/front/admin/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
          // css in js
        })
      ]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    host: "0.0.0.0",
    port: 3170,
    // 是否开启 https
    https: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxDT0RFXFxcXHdlYlxcXFxwcm9qZWN0XFxcXER1Y2stQWN0aXZlLUFkbWluXFxcXGZyb250XFxcXGFkbWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxDT0RFXFxcXHdlYlxcXFxwcm9qZWN0XFxcXER1Y2stQWN0aXZlLUFkbWluXFxcXGZyb250XFxcXGFkbWluXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9DT0RFL3dlYi9wcm9qZWN0L0R1Y2stQWN0aXZlLUFkbWluL2Zyb250L2FkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSBcIm5vZGU6dXJsXCI7XHJcblxyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSBcInVucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGVcIjtcclxuaW1wb3J0IHsgQW50RGVzaWduVnVlUmVzb2x2ZXIgfSBmcm9tIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRwbHVnaW5zOiBbXHJcblx0XHR2dWUoKSxcclxuXHRcdENvbXBvbmVudHMoe1xyXG5cdFx0XHRyZXNvbHZlcnM6IFtcclxuXHRcdFx0XHRBbnREZXNpZ25WdWVSZXNvbHZlcih7XHJcblx0XHRcdFx0XHRpbXBvcnRTdHlsZTogZmFsc2UsIC8vIGNzcyBpbiBqc1xyXG5cdFx0XHRcdH0pLFxyXG5cdFx0XHRdLFxyXG5cdFx0fSksXHJcblx0XSxcclxuXHRyZXNvbHZlOiB7XHJcblx0XHRhbGlhczoge1xyXG5cdFx0XHRcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXHJcblx0XHR9LFxyXG5cdH0sXHJcblx0c2VydmVyOiB7XHJcblx0XHRob3N0OiBcIjAuMC4wLjBcIixcclxuXHRcdHBvcnQ6IDMxNzAsXHJcblx0XHQvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkYgaHR0cHNcclxuXHRcdGh0dHBzOiBmYWxzZSxcclxuXHR9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVixTQUFTLGVBQWUsV0FBVztBQUV0WCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyw0QkFBNEI7QUFMa0wsSUFBTSwyQ0FBMkM7QUFReFEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUztBQUFBLElBQ1IsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1YsV0FBVztBQUFBLFFBQ1YscUJBQXFCO0FBQUEsVUFDcEIsYUFBYTtBQUFBO0FBQUEsUUFDZCxDQUFDO0FBQUEsTUFDRjtBQUFBLElBQ0QsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDckQ7QUFBQSxFQUNEO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUVOLE9BQU87QUFBQSxFQUNSO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
