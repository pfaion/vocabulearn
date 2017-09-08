package pfaion.vocabulearn;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DataSnapshot;

import java.util.ArrayList;

public class CourseViewActivity extends AppCompatActivity {



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_course_view);

        final ListView listView = (ListView) findViewById(R.id.CourseListView);

        View footerButton = View.inflate(this, android.R.layout.simple_list_item_1, null);
        listView.addFooterView(footerButton);

        FirebaseDatabase db = FirebaseDatabase.getInstance();

        final CourseViewActivity thisView = this;
        ValueEventListener postListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot coursesSnapshot) {
                ArrayList<String> titles = new ArrayList<>();
                for(DataSnapshot courseSnapshot : coursesSnapshot.getChildren()) {
                    String title = (String)courseSnapshot.child("title").getValue();
                    Log.d("TEST", title);
                    titles.add(title);
                }
                listView.setAdapter(new ArrayAdapter<String>(thisView, R.layout.list_item_course, R.id.text1, titles));

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Log.w("CourseViewActivity", "loadPost:onCancelled", databaseError.toException());
            }
        };
        db.getReference("courses").addValueEventListener(postListener);
    }
}
