package pfaion.vocabulearn;

import android.net.Uri;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class CourseViewActivity
        extends AppCompatActivity
        implements CoursesListFragment.OnFragmentInteractionListener,
        CourseEditFragment.OnFragmentInteractionListener
{


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.view_courses);
        CoursesListFragment listFragment = new CoursesListFragment();
        getFragmentManager().beginTransaction().add(R.id.fragmentContainer, listFragment).commit();
    }

    @Override
    public void onEditButtonClicked(int position) {
        getFragmentManager()
                .beginTransaction()
                .setCustomAnimations(R.animator.slide_left_enter, R.animator.slide_left_exit, R.animator.slide_right_enter, R.animator.slide_right_exit)
                .replace(R.id.fragmentContainer, new CourseEditFragment())
                .addToBackStack(null)
                .commit();
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
