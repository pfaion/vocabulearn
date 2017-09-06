package pfaion.vocabulearn;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DataSnapshot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CourseView extends AppCompatActivity {




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference dbRoot = database.getReference();


        String courseTitles[] = {
                "Labdien Lettisch Teil 1",
                "English for runnaways",
                "Par le wu fronzehs?"
        };
        String courseLanguages[] = {
                "Lettisch",
                "Englisch",
                "Französisch"
        };

        for (int i = 0; i < 3; ++i) {
            String title = courseTitles[i];
            String lang = courseLanguages[i];
            Map<String, Object> data = new HashMap<>();
            data.put("title", title);
            data.put("language", lang);
            dbRoot.child("courses").push().updateChildren(data);
        }
        
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_course_view);
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_list_item_1, new String[]{});
        final ListView listView = (ListView) findViewById(R.id.CourseListView);
        listView.setAdapter(adapter);

        View footerButton = View.inflate(this, android.R.layout.simple_list_item_1, null);
        listView.addFooterView(footerButton);

        final CourseView thisView = this;

        ValueEventListener postListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot coursesSnapshot) {
                List<String> titles = new ArrayList<>();
                for(DataSnapshot courseSnapshot : coursesSnapshot.getChildren()) {
                    String title = (String)courseSnapshot.child("title").getValue();
                    titles.add(title);
                }
                listView.setAdapter(new ArrayAdapter<String>(thisView, android.R.layout.simple_list_item_1, titles));

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Log.w("SNAPSHOT", "loadPost:onCancelled", databaseError.toException());
            }
        };
        dbRoot.child("courses").addValueEventListener(postListener);
    }
}
