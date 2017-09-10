package pfaion.vocabulearn;


import android.content.Context;
import android.support.v7.widget.AppCompatTextView;
import android.util.AttributeSet;

public class IconView extends AppCompatTextView {

    public IconView(Context context) {
        this(context, null, 0);
    }

    public IconView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public IconView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        setTypeface(FontManager.get(context, "fonts/MaterialIcons-Regular.ttf"));

    }

}
