package pfaion.vocabulearn;

import android.content.Context;
import android.graphics.Typeface;
import android.net.Uri;
import android.os.Bundle;
import android.app.Fragment;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;


public class CoursesListFragment extends Fragment {

    private OnFragmentInteractionListener mListener;

    public CoursesListFragment() {

    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);


    }

    private ListView listView;
    private Typeface iconFont;

    private class ListUpdater implements ValueEventListener {
        @Override
        public void onDataChange(DataSnapshot coursesSnapshot) {
            ArrayList<String> titles = new ArrayList<>();
            for(DataSnapshot courseSnapshot : coursesSnapshot.getChildren()) {
                String title = (String)courseSnapshot.child("title").getValue();
                titles.add(title);
            }
            listView.setAdapter(new ArrayAdapter<String>(getContext(), R.layout.list_item_course, R.id.text1, titles) {
                @Override @NonNull
                public View getView(int position, View convertView, @NonNull ViewGroup parent) {
                    View view = super.getView(position, convertView, parent);
                    TextView tx = (TextView) view.findViewById(R.id.editButton);
                    tx.setTypeface(iconFont);
                    tx.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            int position = listView.getPositionForView(v);
                            if (mListener != null) {
                                mListener.onEditButtonClicked(position);
                            }
                        }
                    });
                    return view;
                }
            });
        }

        @Override
        public void onCancelled(DatabaseError databaseError) {
            Log.w("CourseViewActivity", "loadPost:onCancelled", databaseError.toException());
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {

        View thisView = inflater.inflate(R.layout.fragment_courses_list, container, false);

        listView = (ListView) thisView.findViewById(R.id.list);

        iconFont = Typeface.createFromAsset(getActivity().getAssets(), "fonts/MaterialIcons-Regular.ttf");

        FirebaseDatabase db = FirebaseDatabase.getInstance();

        ListUpdater listUpdater = new ListUpdater();
        db.getReference("courses").addValueEventListener(listUpdater);

        return thisView;
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString() + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }

    interface OnFragmentInteractionListener {
        void onEditButtonClicked(int position);
    }
}
