import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.widget.Toast;

import com.google.android.material.dialog.MaterialAlertDialogBuilder;
import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;
import com.mojang.minecraftpe.core.JavaCallResult;
import com.mojang.minecraftpe.core.JavaPluginEntry;

import org.json.JSONObject;

public class JavaPlugin implements JavaPluginEntry {

    /**
     * 初始化插件
     * @param activity 游戏Activity
     * @param ctx 插件Context
     * @param callResult JS交互调用
     */
    @Override
    public void init(Activity activity, Context ctx, JavaCallResult callResult) {
        Toast.makeText(ctx, "JavaPlugin", Toast.LENGTH_LONG).show();

        TextInputLayout layout = new TextInputLayout(ctx);
        TextInputEditText edit = new TextInputEditText(ctx);
        layout.addView(edit);

        new MaterialAlertDialogBuilder(ctx)
                .setTitle("Material弹窗")
                .setView(layout)
                .setPositiveButton("确定", new OkOnClickListener(callResult, ctx, edit))
                .setNegativeButton("取消", new CancelOnClickListener(ctx))
                .show();
    }

    private static class OkOnClickListener implements DialogInterface.OnClickListener {
        private JavaCallResult callResult;
        private Context context;
        private TextInputEditText editText;

        public OkOnClickListener(JavaCallResult callResult, Context context, TextInputEditText editText) {
            this.callResult = callResult;
            this.context = context;
            this.editText = editText;
        }

        @Override
        public void onClick(DialogInterface dialog, int which) {
            Toast.makeText(context, editText.getText(), Toast.LENGTH_LONG).show();

            try {
                JSONObject root = new JSONObject();
                root.put("name", "Steve");
                root.put("age", 18);
                root.put("sex", "male");
                root.put("height", 178);

                Object result = callResult.callResult(root.toString());
                Toast.makeText(context, result.toString(), Toast.LENGTH_LONG).show();
            } catch (Throwable e) {
                Toast.makeText(context, e.getMessage(), Toast.LENGTH_LONG).show();
            }
        }
    }

    private static class CancelOnClickListener implements DialogInterface.OnClickListener {
        private Context context;

        public CancelOnClickListener(Context context) {
            this.context = context;
        }

        @Override
        public void onClick(DialogInterface dialog, int which) {
            Toast.makeText(context, "取消", Toast.LENGTH_LONG).show();
        }
    }
}
